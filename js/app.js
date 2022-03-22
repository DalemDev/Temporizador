const btnplay = document.getElementById("play");
const btnstop = document.getElementById("stop");
const merror = document.querySelector(".error");
const temp = document.querySelector(".temp");
const modal = document.getElementById("modal");
const finModal = document.getElementById("aceptarFin");
const contenedorTemp = document.getElementById('contenedor-temp')
const cargarSonido = function (fuente) {
  const sonido = document.createElement("audio");
  sonido.id = 'sonido'
  sonido.src = fuente;
  sonido.setAttribute("preload", "auto");
  sonido.setAttribute("controls", "none");
  sonido.setAttribute("loop", "true");
  sonido.style.display = "none";
  document.body.appendChild(sonido);
  return sonido;
};

var idTemp = 0;
btnstop.disabled = true;

btnplay.addEventListener("click", () => {
  const horas = document.getElementById("horas");
  const minutos = document.getElementById("minutos");
  const segundos = document.getElementById("segundos");

  if (horas.value === "" && minutos.value === "" && segundos.value === "") {
    mostrarError("Debe ingresar una hora");
    setTimeout(quitarError, 3000);
  } else {
    if (horas.value < 0 || minutos.value < 0 || segundos < 0) {
      mostrarError("No puede insertar valores negativos");
      resetearHora(horas, minutos, segundos);
      setTimeout(quitarError, 3000);
    } else {
      if (horas.value > 23 || minutos.value > 59 || segundos.value > 59) {
        mostrarError(
          "Las horas no pueden exceder las 23H<br>y los minutos y segundos no pueden exceder los 59"
        );
        resetearHora(horas, minutos, segundos);
        setTimeout(quitarError, 3000);
      } else {
        temp.innerHTML = generalizarTemporizador(
          horas.value,
          minutos.value,
          segundos.value
        );
        iniciarTemporizador(horas.value, minutos.value, segundos.value);
        btnstop.disabled = false;
        btnplay.disabled = true;
        resetearHora(horas, minutos, segundos);
      }
    }
  }
});
btnstop.addEventListener("click", () => {
  detenerTemporizador();
});
function mostrarError(error) {
  merror.innerHTML = error;
}
function resetearHora(horas, minutos, segundos) {
  horas.value = "";
  minutos.value = "";
  segundos.value = "";
}
function quitarError() {
  merror.innerHTML = "";
}
function generalizarTemporizador(horas, minutos, segundos) {
  if (horas === "") {
    horas = `0`;
  }
  if (minutos === "") {
    minutos = `0`;
  }
  if (segundos === "") {
    segundos = `0`;
  }
  if (horas < 10) {
    horas = `0${horas}`;
  }
  if (minutos < 10) {
    minutos = `0${minutos}`;
  }
  if (segundos < 10) {
    segundos = `0${segundos}`;
  }
  return `${horas}:${minutos}:${segundos}`;
}
function iniciarTemporizador(horas, minutos, segundos) {
  let Nhoras = Number(horas);
  let Nminutos = Number(minutos);
  let Nsegundos = Number(segundos);
  idTemp = setInterval(function () {
    if (Nsegundos > 0) {
      Nsegundos--;
    } else if (Nminutos > 0) {
      Nminutos--;
      Nsegundos = 59;
    } else if (Nhoras > 0) {
      Nhoras--;
      Nminutos = 59;
    }
    if (Nhoras === 0 && Nminutos === 0 && Nsegundos === 0) {
      btnstop.disabled = true;
      btnplay.disabled = false;
      detenerTemporizador();
      activarModal();
    }
    temp.innerHTML = generalizarTemporizador(Nhoras, Nminutos, Nsegundos);
  }, 1000);
}
finModal.addEventListener("click", () => {
  quitarModal();
  contenedorTemp.style.display='block'
  const audio = document.getElementById('sonido')
  audio.remove()
});
function detenerTemporizador() {
  clearInterval(idTemp);
  temp.innerHTML = `00:00:00`;
  btnstop.disabled = true;
  btnplay.disabled = false;
}
function activarModal() {
  modal.classList.remove("desactivar");
  contenedorTemp.style.display='none'
  const audio = cargarSonido("./assets/audio/finTemp.mp3");
  audio.play();
}
function quitarModal() {
  modal.classList.add("desactivar");
  const audio = document.getElementById('sonido')
  audio.pause();
}
