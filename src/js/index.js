const date = "07-07-2021";

const initTimer = (time) => {
  const updateTime = () => {
    const timer = new Date(time || Date.now()).getTime();
    const now = Date.now();
    const remainingTime = timer - now;
    const getTime = (remainingTime) => {
      const prevSeconds = Math.floor(remainingTime / 1000);
      const prevMinutes = Math.floor(prevSeconds / 60);
      const seconds = prevSeconds % 60;
      const prevHours = Math.floor(prevMinutes / 60);
      const minutes = prevMinutes % 60;
      const days = Math.floor(prevHours / 24);
      const hours = prevHours % 24;
      const o = {};
      o.days = days >= 0 ? days : 0;
      o.hours = hours >= 0 ? hours : 0;
      o.minutes = minutes >= 0 ? minutes : 0;
      o.seconds = seconds >= 0 ? seconds : 0;
      return o;
    };
    const timeN = getTime(remainingTime);
    const prevTime = getTime(remainingTime - 1000);
    console.table([timeN, prevTime]);
    Object.entries(timeN).map((myTime) => {
      document.querySelector(`.${myTime[0]}`).innerHTML =
        `<h1 class="hs">${myTime[0]}</h1>` +
        (myTime[1] < 10 ? "0" + myTime[1] : myTime[1])
          .toString()
          .split("")
          .map((el, i) => {
            let d = 9;
            if (i === 0 && (myTime[0] === "minutes" || myTime[0] === "seconds"))
              d = 5;
            if (i === 0 && myTime[0] === "hours") d = 2;
            const y = prevTime?.[myTime[0]]?.toString().split("") || 0;
            const x = (y + 1 > 10 ? "0" + y : y)[i] || 0;
            const a = x?.toString() !== el.toString();
            console.log(myTime[0] + ":" + x);
            return `<span data-next="${
              el - 1 > -1 ? el - 1 : d
            }" class="digit ${a ? "to-be-changed" : ""} d1${Array.from(
              Array(i).keys()
            )
              .map((el) => "0")
              .join("")}">
            <span class="inner">${el}</span>
            </span>`;
          })
          .join("");
    });
    setTimeout(() => {
      updateTime();
    }, 1000);
  };
  updateTime(0);
};

initTimer(date);
