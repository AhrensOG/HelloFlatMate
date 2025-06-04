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

// Función para enviar recordatorio de check-in
const sendCheckInReminders = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/cron/send_check_in_reminders`
    );
    console.log(
      `Cron job ejecutado (send check-in reminders) a las ${new Date().toLocaleString()}: Status ${
        response.status
      }`
    );
  } catch (error) {
    console.error("Error al ejecutar sendCheckInReminders:", error);
  }
};

// Ejecutar actualización de contratos todos los días a medianoche
cron.schedule("0 0 * * *", () => {
  console.log(
    "⏰ Ejecutando cron de actualización de contratos (diario a las 00:00)"
  );
  updateContracts();
});

// Ejecutar recordatorio inicial solo el día 20 a las 00:00
cron.schedule("0 0 20 * *", () => {
  console.log(
    "📩 Ejecutando cron de recordatorio inicial (día 20 a las 00:00)"
  );
  sendInitialReminders();
});

// Ejecutar recordatorio de pagos vencidos solo el día 26 a las 00:00
cron.schedule("0 8 26-31 * *", () => {
  console.log(
    "📩 Ejecutando cron de recordatorio de pago vencido (días 26 a 31)"
  );
  sendLatePaymentReminders();
});

// Ejecutar recordatorio de check-in todos los días a las 08:00
cron.schedule("0 0 * * *", () => {
  console.log(
    "📩 Ejecutando cron de recordatorio de check-in (diario a las 00:00)"
  );
  sendCheckInReminders();
});
