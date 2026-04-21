export interface InstrumentImage {
  public_id: string;
  url: string;
}

export interface Instrument {
  _id: string;
  instrumentTitle: string;
  instrumentDescription: string;
  instrumentImage: InstrumentImage;
  level: "beginner" | "intermediate" | "advanced";
  isActive: boolean;
  accountStatus: "active" | "inactive";
  modules: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface InstrumentFormData {
  instrumentTitle: string;
  instrumentDescription: string;
  level: "beginner" | "intermediate" | "advanced";
  isActive: boolean;
  image?: File;
}

export interface MetaData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface GetAllInstrumentsResponse {
  success: boolean;
  message: string;
  data: {
    meta: MetaData;
    instruments: Instrument[];
  };
}

export interface SingleInstrumentResponse {
  success: boolean;
  message: string;
  data: Instrument;
}

export interface CreateUpdateInstrumentResponse {
  success: boolean;
  message: string;
  data: Instrument;
}

export interface DeleteInstrumentResponse {
  success: boolean;
  message: string;
  meta: null;
  data: Instrument;
}
