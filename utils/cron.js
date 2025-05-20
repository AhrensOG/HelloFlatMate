import cron from "node-cron";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const updateContracts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/cron/update_contracts`);
    console.log(
      `Cron job ejecutado (update contracts) a las ${new Date().toLocaleString()}: Status ${
        response.status
      }`
    );
  } catch (error) {
    console.error("Error al ejecutar updateContracts:", error);
  }
};

// Función para enviar recordatorio de primer aviso
const sendInitialReminders = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/cron/send_initial_payment_reminders`
    );
    console.log(
      `Cron job ejecutado (send initial reminders) a las ${new Date().toLocaleString()}: Status ${
        response.status
      }`
    );
  } catch (error) {
    console.error("Error al ejecutar sendInitialReminders:", error);
  }
};

// Función para enviar recordatorio de pagos vencidos
const sendLatePaymentReminders = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/cron/send_late_payment_reminders`
    );
    console.log(
      `Cron job ejecutado (send late payment reminders) a las ${new Date().toLocaleString()}: Status ${
        response.status
      }`
    );
  } catch (error) {
    console.error("Error al ejecutar sendLatePaymentReminders:", error);
  }
};

// Ejecutar actualización de contratos todos los días a medianoche
cron.schedule("0 0 * * *", () => {
  console.log("⏰ Ejecutando cron de actualización de contratos");
  updateContracts();
});

// Ejecutar recordatorio inicial solo el día 20 a las 00:00
// cron.schedule("0 0 20 * *", () => {
//   console.log(
//     "📩 Ejecutando cron de recordatorio inicial (día 20 a las 00:00)"
//   );
//   sendInitialReminders();
// });

// Ejecutar recordatorio de pagos vencidos solo el día 26 a las 00:00
cron.schedule("0 0 26 * *", () => {
  console.log(
    "📩 Ejecutando cron de recordatorio de pago vencido (día 26 a las 00:00)"
  );
  sendLatePaymentReminders();
});
