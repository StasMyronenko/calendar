let calendar = document.querySelector('.calendar')

var date = 0;
var days_of_month;
const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month

    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

Array.prototype.slice.call(document.querySelectorAll('.calendar-days')).forEach(function(element) {
    element.addEventListener('click', function(ev) {
      popup.style.display = 'block';
    });
  });

Array.prototype.slice.call(document.querySelectorAll('.close-btn')).forEach(function(element) {
    element.addEventListener('click', function(ev) {
      popup.style.display = 'none';
    });
  });


let  sugar_anylise = document.getElementById('sugar-level').value

Array.prototype.slice.call(document.querySelectorAll('.calendar-days')).forEach(function(element) {
    element.addEventListener('click', function(ev) {
      popup.style.display = 'block';
      date = ev.target.innerText;
    });
  });


Array.prototype.slice.call(document.querySelectorAll('.btn')).forEach(function(element) {
    element.addEventListener('click', function(op) {
        let f = document.querySelector('.popup-content');
        var newInput =  document.createElement("input");
        newInput.value = date + '-' + curr_month.value + '-' + curr_year.value;
        newInput.style.display = 'none';
        newInput.name = 'date';

        f.append(newInput);
    });
});

var db_list = document.getElementById('db').querySelectorAll('p')

var dict = {}

for(var i = 0; i < db_list.length; i++){
	let el = db_list[i].innerText
	let data = el[el.length-1]
	let key = el.slice(0, el.length - 2)
	dict[key] = Number(data)
}

var days = days_of_month[curr_month.value]
for(var i = 0; i < days; i++){

	let k = i + 1 + '-' + curr_month.value + '-' + curr_year.value
	if(dict[k] != undefined){
		console.log(k)
		if(dict[k] > 5){
			document.querySelectorAll('.calendar-day-hover')[i].classList.add('red')

		} else{
			document.querySelectorAll('.calendar-day-hover')[i].classList.add('green')
		}
	}
}

Array.prototype.slice.call(document.querySelectorAll('div')).forEach(function(element) {
    element.addEventListener('click', function(op) {
		var days = days_of_month[curr_month.value]

		for(var i = 0; i < days; i++){

			let k = i + 1 + '-' + curr_month.value + '-' + curr_year.value
			if(dict[k] != undefined){
				console.log(k)
				if(dict[k] > 5){
					document.querySelectorAll('.calendar-day-hover')[i].classList.add('red')

				} else{
					document.querySelectorAll('.calendar-day-hover')[i].classList.add('green')
				}
			}
		}
    });
});