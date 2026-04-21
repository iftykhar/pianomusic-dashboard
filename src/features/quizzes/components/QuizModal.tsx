"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Quiz } from "../type";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { useInstruments } from "../../instruments/hooks/useInstruments";
import { useModules } from "../../modules/hooks/useModules";

const optionSchema = z.object({
  optionText: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean(),
});

const questionSchema = z.object({
  questionText: z.string().min(5, "Question must be at least 5 characters"),
  options: z.array(optionSchema).min(2, "At least 2 options are required"),
});

const quizSchema = z
  .object({
    quizName: z.string().min(3, "Quiz name must be at least 3 characters"),
    instrumentId: z.string().min(1, "Instrument is required"),
    moduleId: z.string().min(1, "Module is required"),
    passingPercentage: z.coerce.number().min(1).max(100),
    timeLimit: z.coerce.number().min(1, "Time limit is required"),
    questions: z
      .array(questionSchema)
      .min(1, "At least 1 question is required"),
  })
  .superRefine((data, ctx) => {
    const questionTexts = data.questions.map((q) =>
      q.questionText.trim().toLowerCase(),
    );
    const duplicates = questionTexts.filter(
      (text, index) => questionTexts.indexOf(text) !== index,
    );

    if (duplicates.length > 0) {
      data.questions.forEach((q, index) => {
        if (duplicates.includes(q.questionText.trim().toLowerCase())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Question text must be unique within the quiz",
            path: ["questions", index, "questionText"],
          });
        }
      });
    }
  });

type FormValues = z.infer<typeof quizSchema>;

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Quiz>) => void;
  isLoading: boolean;
  initialData?: Quiz | null;
}

const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  initialData,
}) => {
  const { data: instrumentsData } = useInstruments(1, 100);

  const form = useForm<FormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      quizName: "",
      instrumentId: "",
      moduleId: "",
      passingPercentage: 70,
      timeLimit: 15,
      questions: [
        {
          questionText: "",
          options: [
            { optionText: "", isCorrect: true },
            { optionText: "", isCorrect: false },
          ],
        },
      ],
    },
  });

  const selectedInstrumentId = form.watch("instrumentId");
  const { data: modulesData } = useModules(selectedInstrumentId, 1, 100);

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          quizName: initialData.quizName,
          instrumentId:
            typeof initialData.instrumentId === "string"
              ? initialData.instrumentId
              : (initialData.instrumentId as { _id: string })?._id || "",
          moduleId:
            typeof initialData.moduleId === "string"
              ? initialData.moduleId
              : (initialData.moduleId as { _id: string })?._id || "",
          passingPercentage: initialData.passingPercentage,
          timeLimit: initialData.timeLimit,
          questions: (initialData.questions || []).map((q) => ({
            questionText: q.questionText,
            options: (q.options || []).map((o) => ({
              optionText: o.optionText,
              isCorrect: o.isCorrect,
            })),
          })),
        });
      } else {
        form.reset({
          quizName: "",
          instrumentId: "",
          moduleId: "",
          passingPercentage: 70,
          timeLimit: 15,
          questions: [
            {
              questionText: "",
              options: [
                { optionText: "", isCorrect: true },
                { optionText: "", isCorrect: false },
              ],
            },
          ],
        });
      }
    }
  }, [initialData, form, isOpen]);

  const onFormSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            {initialData ? "Update Quiz" : "Create New Quiz"}
          </DialogTitle>
        </DialogHeader>

        {isLoading && !initialData && !form.getValues("quizName") ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
            <p className="text-gray-500 font-medium italic">
              Fetching quiz details...
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onFormSubmit)}
              className="space-y-6 pt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="quizName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-gray-700">
                        Quiz Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Piano Basics" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="instrumentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-gray-700">
                          Instrument
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {instrumentsData?.data?.instruments?.map(
                              (inst: {
                                _id: string;
                                instrumentTitle: string;
                              }) => (
                                <SelectItem key={inst._id} value={inst._id}>
                                  {inst.instrumentTitle}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="moduleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-gray-700">
                          Module
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={!selectedInstrumentId}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {modulesData?.data?.map(
                              (mod: { _id: string; title: string }) => (
                                <SelectItem key={mod._id} value={mod._id}>
                                  {mod.title}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="passingPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-gray-700">
                        Passing %
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-gray-700">
                        Time (mins)
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="text-lg font-bold text-gray-800">Questions</h3>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() =>
                      appendQuestion({
                        questionText: "",
                        options: [
                          { optionText: "", isCorrect: true },
                          { optionText: "", isCorrect: false },
                        ],
                      })
                    }
                    className="bg-orange-600 hover:bg-orange-700 sm:h-8"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Question
                  </Button>
                </div>

                {questionFields.map((qField, qIndex) => (
                  <div
                    key={qField.id}
                    className="p-4 border border-orange-100 rounded-xl bg-orange-50/20 space-y-4 relative group"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 text-gray-400 hover:text-red-500"
                      onClick={() => removeQuestion(qIndex)}
                      disabled={questionFields.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <FormField
                      control={form.control}
                      name={`questions.${qIndex}.questionText`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-gray-600">
                            Question {qIndex + 1}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter question text..."
                              {...field}
                              className="bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Options
                      </FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[0, 1, 2, 3].map((oIndex) => (
                          <div key={oIndex} className="flex items-center gap-2">
                            <FormField
                              control={form.control}
                              name={`questions.${qIndex}.options.${oIndex}.isCorrect`}
                              render={({ field }) => (
                                <FormItem className="space-y-0">
                                  <FormControl>
                                    <input
                                      type="radio"
                                      name={`questions.${qIndex}.correctOption`}
                                      checked={field.value}
                                      onChange={() => {
                                        // Set all options to false, then this one to true
                                        const currentOptions = form.getValues(
                                          `questions.${qIndex}.options`,
                                        );
                                        currentOptions.forEach((_, idx) => {
                                          form.setValue(
                                            `questions.${qIndex}.options.${idx}.isCorrect`,
                                            idx === oIndex,
                                          );
                                        });
                                      }}
                                      className="accent-orange-600 w-4 h-4 cursor-pointer"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`questions.${qIndex}.options.${oIndex}.optionText`}
                              render={({ field }) => (
                                <FormItem className="flex-1 space-y-0">
                                  <FormControl>
                                    <Input
                                      placeholder={`Option ${oIndex + 1}`}
                                      {...field}
                                      className={`h-8 text-sm bg-white ${form.watch(`questions.${qIndex}.options.${oIndex}.isCorrect`) ? "border-green-500 ring-1 ring-green-500/20" : ""}`}
                                      required={oIndex < 2}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-orange-600 hover:bg-orange-700 px-8"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {initialData ? "Update Quiz" : "Create Quiz"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
