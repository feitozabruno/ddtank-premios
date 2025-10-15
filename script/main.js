document.addEventListener("DOMContentLoaded", () => {
  // Define a data de expiração: 20 de Outubro do ano corrente, às 15:00:00.
  const ANO_EXPIRAÇÃO = new Date().getFullYear(); // Pega o ano atual automaticamente
  const MES_EXPIRAÇÃO = 9; // 9 = Outubro... (0 = Janeiro)
  const DIA_EXPIRAÇÃO = 20; // 20 de Outubro
  const HORA_EXPIRAÇÃO = 15; // 15hrs
  const MINUTO_EXPIRAÇÃO = 0; // 15:00hrs
  const SEGUNDO_EXPIRAÇÃO = 0; // 15:00:00hrs

  // Constrói a string de data no formato ISO 8601 com o fuso horário de São Paulo (-03:00)
  // Isso garante que a data seja criada corretamente, independentemente do fuso horário do usuário.
  const monthString = String(MES_EXPIRAÇÃO + 1).padStart(2, "0");
  const dayString = String(DIA_EXPIRAÇÃO).padStart(2, "0");
  const hourString = String(HORA_EXPIRAÇÃO).padStart(2, "0");
  const minuteString = String(MINUTO_EXPIRAÇÃO).padStart(2, "0");
  const secondString = String(SEGUNDO_EXPIRAÇÃO).padStart(2, "0");

  const isoString = `${ANO_EXPIRAÇÃO}-${monthString}-${dayString}T${hourString}:${minuteString}:${secondString}-03:00`;
  const launchDate = new Date(isoString);

  const countdownElements = document.querySelectorAll(".contador h2.destaque");
  const legendaDiasElements = document.querySelectorAll(".legenda-dias");

  if (countdownElements.length > 0) {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        clearInterval(interval);
        countdownElements.forEach((el) => {
          el.innerHTML = "EXPIROU!";
        });
        return;
      }

      // Calcula dias, horas, minutos e segundos
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Se o tempo restante for maior que 24 horas, exibe os dias.
      if (distance > 24 * 60 * 60 * 1000) {
        const formattedDays = String(days).padStart(2, "0");
        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");
        const timeString = `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        countdownElements.forEach((el) => {
          el.innerHTML = timeString;
        });
        legendaDiasElements.forEach((el) => {
          if (el) el.style.display = "inline";
        });
      } else {
        // Caso contrário, exibe apenas horas, minutos e segundos.
        const totalHours = days * 24 + hours;
        const formattedHours = String(totalHours).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");
        const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        countdownElements.forEach((el) => {
          el.innerHTML = timeString;
        });
        legendaDiasElements.forEach((el) => {
          if (el) el.style.display = "none";
        });
      }
    }, 1000);
  }
});

const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-modal");
const openModalBtn = document.querySelector(".botao2");

if (openModalBtn) {
  openModalBtn.addEventListener("click", () => {
    modal.classList.add("show");
  });
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });
}

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.classList.remove("show");
  }
});

const codigoExclusivoBtn = document.querySelector(".codigo-exclusivo");

if (codigoExclusivoBtn) {
  codigoExclusivoBtn.addEventListener("click", () => {
    const codigo = codigoExclusivoBtn.querySelector("span").innerText;
    navigator.clipboard
      .writeText(codigo)
      .then(() => {
        alert(`Código "${codigo}" copiado para a área de transferência!`);
      })
      .catch((err) => {
        console.error("Erro ao copiar o código: ", err);
        alert("Erro ao copiar o código.");
      });
  });
}
