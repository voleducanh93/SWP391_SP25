import axiosInstance from "../utils/axiosInstance.ts";
import {
    PostVaccineComboDetail,
    VaccineDetail,
    VaccinationSchedule,
    VaccineInventoryStock
} from "../interfaces/Vaccine.ts";

export const apiGetVaccineIntro = async () => {
    try {
        const response = await axiosInstance.get("/api/Vaccine/basic");
        return response.data || [];
    } catch (error) {
        console.error("API Get Vaccine Intro Error:", error);
        throw error;
    }
};

export const apiGetVaccineDetailById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/api/Vaccine/${id}`);
        return response.data || {};
    } catch (error) {
        console.error("API Get Vaccine Detail By ID Error:", error);
        throw error;
    }
};

export const apiGetVaccineDetail = async () => {
    try {
        const response = await axiosInstance.get("/api/Vaccine");
        return response.data || {};
    } catch (error) {
        console.error("API Get Vaccine Detail Error:", error);
        throw error;
    }
};

export const apiDeleteVaccine = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/api/Vaccine/${id}`);
        return response.data || {};
    } catch (error) {
        console.error("API Delete Vaccine Error:", error);
        throw error;
    }
};

export const apiAddVaccine = async (data: VaccineDetail) => {
    try {
        const response = await axiosInstance.post("/api/Vaccine", data);
        return response.data || {};
    } catch (error) {
        console.error("API Add Vaccine Error:", error);
        throw error;
    }
};

export const apiUpdateVaccine = async (id: string, data: VaccineDetail) => {
    try {
        const response = await axiosInstance.put(`/api/Vaccine/${id}`, data);
        return response.data || {};
    } catch (error) {
        console.error("API Update Vaccine Error:", error);
        throw error;
    }
};

export const apiGetComboVaccineDetail = async () => {
    try {
        const response = await axiosInstance.get("/api/ComboVaccine");
        return response.data || {};
    } catch (error) {
        console.error("API Get Combo Vaccine Detail Error:", error);
        throw error;
    }
};

export const apiAddComboVaccine = async (data: PostVaccineComboDetail) => {
    try {
        const response = await axiosInstance.post("/api/ComboVaccine", data);
        return response.data || {};
    } catch (error) {
        console.error("API Add Combo Vaccine Error:", error);
        throw error;
    }
};

export const apiUpdateComboVaccine = async (id: number, data: PostVaccineComboDetail) => {
    try {
        const response = await axiosInstance.put(`/api/ComboVaccine/${id}`, data);
        return response.data || {};
    } catch (error) {
        console.error("API Update Combo Vaccine Error:", error);
        throw error;
    }
};

export const apiDeleteComboVaccine = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/api/ComboVaccine/${id}`);
        return response.data || {};
    } catch (error) {
        console.error("API Delete Combo Vaccine Error:", error);
        throw error;
    }
};

export const apiGetComBoVaccineById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/api/ComboVaccine/${id}`);
        return response.data || {};
    } catch (error) {
        console.error("API Get Combo Vaccine By ID Error:", error);
        throw error;
    }
};

export const apiGetVaccinationSchedule = async () => {
    try {
        const response = await axiosInstance.get("/api/VaccinationSchedule");
        return response.data || {};
    } catch (error) {
        console.error("API Get Vaccination Schedule Error:", error);
        throw error;
    }
};

export const apiAddVaccinationSchedule = async (data: VaccinationSchedule) => {
    try {
        const response = await axiosInstance.post("/api/VaccinationSchedule", data);
        return response.data || {};
    } catch (error) {
        console.error("API Add Vaccination Schedule Error:", error);
        throw error;
    }
};

export const apiUpdateVaccinationSchedule = async (scheduleId: number, data: VaccinationSchedule) => {
    try {
        console.log("📤 Sending data:", data);
        const response = await axiosInstance.put(`/api/VaccinationSchedule/${scheduleId}`, data);
        console.log(response.data);
        return response.data || {};
    } catch (error) {
        console.error("API Update Vaccination Schedule Error:", error);
        throw error;
    }
};

export const apiDeleteVaccinationSchedule = async (scheduleId: number) => {
    try {
        const response = await axiosInstance.delete(`/api/VaccinationSchedule/${scheduleId}`);
        return response.data || {};
    } catch (error) {
        console.error("API Delete Vaccination Schedule Error:", error);
        throw error;
    }
};

export const apiGetVaccinationScheduleById = async (scheduleId: number) => {
    try {
        const response = await axiosInstance.get(`/api/VaccinationSchedule/${scheduleId}`);
        return response.data || {};
    } catch (error) {
        console.error("API Get Vaccination Schedule By ID Error:", error);
        throw error;
    }
};

export const apiGetVaccineInventoryStock = async () => {
    try {
        const response = await axiosInstance.get("/api/VaccineInventory/stock");
        return response.data || {};
    } catch (error) {
        console.error("API Get Vaccine Inventory Stock Error:", error);
        throw error;
    }
};

export const apiAddVaccineInventory = async (data: VaccineInventoryStock) => {
    try {
        const response = await axiosInstance.post("/api/VaccineInventory/add", data);
        return response.data || {};
    }catch (error) {
        console.error("API Add VaccineInventory Error:", error);
        throw error;
    }
}


export const apiSearchVaccineInventory = async (keyword: string) => {
    try {
        const response = await axiosInstance.get("/api/VaccineInventory/search", {
            params: { keyword },
        });
        return response.data || {};
    } catch (err) {
        console.error("API Search VaccineInventory Error:", err);
        throw err;
    }
};

