import { Instrument } from "../instruments/type";

export interface ModuleImage {
  url: string;
  public_id: string;
  _id: string;
}

export interface Module {
  _id: string;
  instrumentId: string | Instrument;
  title: string;
  description: string;
  order: number;
  images: ModuleImage[];
  lessons: string[];
  quizIds: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ModuleFormData {
  instrumentId: string;
  title: string;
  description: string;
  order: number;
  images?: File;
}

export interface MetaData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface GetModulesResponse {
  success: boolean;
  message: string;
  meta: MetaData | null;
  data: Module[];
}

export interface SingleModuleResponse {
  success: boolean;
  message: string;
  data: Module;
}

export interface CreateUpdateModuleResponse {
  success: boolean;
  message: string;
  data: Module;
}

export interface DeleteModuleResponse {
  success: boolean;
  message: string;
  data: Module;
}
