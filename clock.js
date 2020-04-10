const getRandomNumber = max => {
    return Math.floor(Math.random() * max);
};

const getRandomColor = () => {
    return `rgb(
        ${getRandomNumber(255)},
        ${getRandomNumber(255)},
        ${getRandomNumber(255)})
        `;
};

const normilizeTime = (time) => {
    return time < 10 ? `0${time}` : time;
}

const normilizeDay = value => {
    const days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
    return days[value];
}


class Clock {
    constructor(mountPoint = document.querySelector('body')) {
        this.mountPoint = mountPoint;
        this.activeMode = 0;
    }



    init() {
        this.render();
        this.attachEvents();
        this.setColors();
        this.renderTime();
        this.startTime();
        this.startStageInterval();
    }

    render() {
        this.container = document.createElement('div');
        this.content = document.createElement('h1');
        this.container.style.background = getRandomColor();

        this.container.classList.add('clock');
        this.content.classList.add('clock__content');


        this.container.appendChild(this.content);
        this.mountPoint.appendChild(this.container);
    }

    setColors() {
        const color = getRandomColor()
        this.container.style.background = color;
        this.content.style.color = color;
    }

    renderTime() {
        let content;
        switch (this.activeMode) {
            case 0:
                content = this.getFull();
                break;

            case 1:
                content = this.getShort();
                break;

            case 2:
                content = this.getDate();
                break;

            default:
                content = this.getFull();
        }
        this.content.textContent = content;
    }



    getFull() {
        const currentDate = new Date();

        const h = normilizeTime(currentDate.getHours());
        const m = normilizeTime(currentDate.getMinutes());
        const s = normilizeTime(currentDate.getSeconds());

        return `${h}:${m}:${s}`;
    }

    getShort() {
        const currentDate = new Date();

        const h = normilizeTime(currentDate.getHours());
        const m = normilizeTime(currentDate.getMinutes());

        return `${h}:${m}`;
    }

    getDate() {
        const currentDate = new Date();

        const date = normilizeTime(currentDate.getDate());
        const day = normilizeDay(currentDate.getDay());
        const year = normilizeTime(currentDate.getFullYear());

        return `${date}/${day}/${year}`;
    }


    startTime() {

        setInterval(() => this.renderTime(), 500);
    }

    startStageInterval() {
        setInterval(() => this.swichMode(), 5000);
    }

    attachEvents() {
        this.container.addEventListener('click', () => {
            this.swichMode();
        })
    }

    increaseMode() {
        if (this.activeMode + 1 < 3) {
            this.activeMode++;
        } else {
            this.activeMode = 0;
        }
        console.log(this.activeMode);
    }


    swichMode() {
        this.increaseMode();
        this.renderTime();
        this.setColors();
    }
}