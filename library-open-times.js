function openingTimes(str) {
   const openTimes = {
      monday: {
         day: 'Monday',
         opens: 480,
         closes: 1200
      },
      tuesday: {
         day: 'Tuesday',
         opens: 480,
         closes: 1200
      },
      wednesday: {
         day: 'Wednesday',
         opens: 480,
         closes: 1200
      },
      thursday: {
         day: 'Thursday',
         opens: 480,
         closes: 1200
      },
      friday: {
         day: 'Friday',
         opens: 480,
         closes: 1200
      },
      saturday: {
         day: 'Saturday',
         opens: 600,
         closes: 1080
      },
      sunday: {
         day: 'Sunday',
         opens: 720,
         closes: 990
      }
   }

   let currentObj = null

   for (const key in openTimes) {
      const obj = openTimes[key]
      if (currentObj) {
         currentObj.next = obj
      }
      currentObj = obj
   }
   currentObj.next = openTimes.monday
   
   let splitStr = str.split(' ')
   let day = splitStr[0].toLowerCase()
   let timeStr = splitStr[1]
   let hourVal = +timeStr.split(':')[0]
   let minVal = +timeStr.split(':')[1]
   let timeVal = hourVal * 60 + minVal
   if (minVal > 59) {
      return 'Invalid time!'
   }
   if (hourVal > 23) {
      return 'Invalid time!'
   }

   const determineStatus = (obj) => {
      const {opens, closes} = obj

      const minutesToTime = (mins) => {
         const hours = Math.floor(mins / 60)
         const minutes = mins % 60
         const formattedHours = hours < 10 ? '0' + hours : hours
         const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
         return `${formattedHours}:${formattedMinutes}`
      }
      
      if (timeVal > opens && timeVal < closes) {
         return `Library closes at ${minutesToTime(closes)}`
      } 
      else if (timeVal < opens) {
         return `Library opens: today ${minutesToTime(opens)}`
      }
      else if (timeVal >= closes) {
         return `Library opens: ${obj.next.day} ${minutesToTime(obj.next.opens)}`
      }
   }

   switch (day) {
      case 'monday':
         return determineStatus(openTimes.monday)
      case 'tuesday':
         return determineStatus(openTimes.tuesday)
      case 'wednesday':
         return determineStatus(openTimes.wednesday)
      case 'thursday':
         return determineStatus(openTimes.thursday)
      case 'friday':
         return determineStatus(openTimes.friday)
      case 'saturday':
         return determineStatus(openTimes.saturday)
      case 'sunday':
         return determineStatus(openTimes.sunday)
      default:
         return 'Invalid time!'
   }
}


// Examples:
console.log(openingTimes("Monday 09:30")); //returns "Library closes at 20:00"
console.log(openingTimes("Saturday 00:00")); //returns "Library opens: today 10:00"
console.log(openingTimes("Tuesday 20:00")); //returns "Library opens: Wednesday 08:00"
console.log(openingTimes("MoNDay 07:59")); //returns "Library opens: today 08:00"
console.log(openingTimes("Tuesday 13:61")); //returns "Invalid time!"
console.log(openingTimes("wednsay 12:40")); //returns "Invalid time!"
console.log(openingTimes('sunday 25:33'))

// You are frantically studying for your exams. To do so you need to frequently visit the library to get your revision time in.
// You will be given a string as a parameter letting you know the current time. The passed string will be given in the form:
// "Monday 12:35"
// Your task is to create a function which lets you know either:
// -When the library closes if it is open or,
// -When the library opens if it is closed.
// If the library is closed and opens later in the current day, you want your return string to say:
// "Library opens: today XX:XX"
// Where "XX:XX" is the time the library opens in a 24 hour format.
// If the library is closed and opens the next day, you want your return string to say:
// "Library opens: WEEKDAY XX:XX"
// Where "WEEKDAY" is the next day that the library opens.
// If the library is open, you want to return:
// "Library closes at XX:XX"
// Where "XX:XX" is the time that the Library closes.

// You can see the opening times of the library below.
// Opening Times -
// Monday:  08:00 - 20:00 
// Tuesday:  08:00 - 20:00
// Wednesday:  08:00 - 20:00
// Thursday:  08:00 - 20:00
// Friday:  08:00 - 20:00
// Saturday:  10:00 - 18:00
// Sunday:  12:00 - 16:30

// Some things to note:
// -The string given will always be in the form "WORD XX:XX" Where "X" will always be a digit from 1-9.
// -Capitalisation of the passed string should not affect the outcome.
// -The time is given in a 24 hour format (your return string should also be in this format).
// -If the first word of the passed string is not a weekday or the time is invalid your function should return "Invalid time!".
// -The format of your returned weekday should start with a capital, with all other characters in lower case eg Monday.
// -The first letter of the returned string should always be a capital.
