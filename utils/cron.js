import cron from "node-cron";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const updateContracts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/cron/update_contracts`);
    console.log(
      `Cron job ejecutado a las ${new Date().toLocaleString()}: Status ${
        response.status
      }`
    );
  } catch (error) {
    console.error("Error al ejecutar el cron job:", error);
  }
};

const addCheckOutClean = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/cron/addCheckOutClean`);
    console.log(
      `Cron job ejecutado a las ${new Date().toLocaleString()}: Status ${
        response.status
      }`
    );
  } catch (error) {
    console.error("Error al ejecutar el cron job:", error);
  }
};

const renewSupplies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/cron/renewSupplies`);
    console.log(
      `Cron job ejecutado a las ${new Date().toLocaleString()}: Status ${
        response.status
      }`
    );
  } catch (error) {
    console.error("Error al ejecutar el cron job:", error);
  }
};

cron.schedule("0 0 * * *", () => {
  console.log("Ejecutando cron job");
  updateContracts();
  // addCheckOutClean();
  // renewSupplies();
});
