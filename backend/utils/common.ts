/**
* Adjust the correct format to the schedules
* @param schedule 
*/
export function setCorrectFormatSchedule(schedule : any) {

    var days = ["domingo","lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

    for (var i in days){
        for (var j in schedule[days[i]]){
            schedule[days[i]][j].start = (new Date(schedule[days[i]][j].start.seconds * 1000 )).toLocaleTimeString();
            schedule[days[i]][j].end = (new Date(schedule[days[i]][j].end.seconds * 1000)).toLocaleTimeString();
        }
    }
}