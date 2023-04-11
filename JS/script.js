const apiUrl = "https://api.themoviedb.org/3/";
const apiKey = "e840f2f49438cacf07e49a2567051200";
const apiLang = "pt-BR";
const imgUrl = "https://image.tmdb.org/t/p/original";

const randomNumber = (size) => {
  return Math.floor(Math.random() * size);
};

let type = randomNumber(4);
type = type % 2 === 0 ? "movie" : "tv";

fetch(`${apiUrl}trending/${type}/day?api_key=${apiKey}&language=${apiLang}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let show = randomNumber(data.results.length);

    const showName = !data.results[show].title
      ? data.results[show].name
      : data.results[show].title;

    document.querySelector("#id-show-name").innerText =
      "*Imagem de fundo: " + showName;

    const backgroundImg = imgUrl + data.results[show].backdrop_path;

    console.log(data.results[show].backdrop_path);

    document.querySelector("#full-page").style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(" +
      backgroundImg +
      ")";
  })
  .catch((error) => {
    console.log("Error: " + error.message);
  });

const launchDate = new Date("Jan 1, 2024 09:00:00").getTime();

const interval = () => {
  const timeNow = new Date().getTime();
  const timeDifference = launchDate - timeNow;

  let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  days = days < 10 ? "0" + days : days;

  let hours = Math.floor(
    (timeDifference % (100 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  hours = hours < 10 ? "0" + hours : hours;

  let minutes = Math.floor((timeDifference % (100 * 60 * 60)) / (1000 * 60));
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let seconds = Math.floor((timeDifference % (100 * 60)) / 1000);
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.querySelector("#time-left").innerHTML = `
                                                    <ul>
                                                        <li>
                                                            <span class="time-num">${days}</span>
                                                            <span class="time-txt">dias</span>
                                                        </li>
                                                        <li>
                                                            <span class="time-num">${hours}</span>
                                                            <span class="time-txt">horas</span>
                                                        </li>
                                                        <li>
                                                            <span class="time-num">${minutes}</span>
                                                            <span class="time-txt">minutos</span>
                                                        </li>
                                                        <li>
                                                            <span class="time-num">${seconds}</span>
                                                            <span class="time-txt">segundos</span>
                                                        </li>
                                                    </ul>
                                                    `;

  if (timeDifference < 0) {
    clearInterval(interval);
    document.querySelector("#time-left").innerHTML = "Tempo Finalizado";
  }
};

setInterval(interval, 1000);
