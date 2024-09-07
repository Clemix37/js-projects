export default class Utils {

    //#region Properties

    static dateFormats = {
        DayMonthYearHyphens: "dd-mm-YYYY",
        DayMonthYearSlash: "dd/mm/YYYY",
    };
    static days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
    static months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //#endregion

    //#region Constructor

    //#endregion

    //#region Accessors

    //#endregion

    //#region Public methods

    /**
     * Get a random index from the array given as argument
     * @param {any[]} arr 
     * @returns {number}
     */
    static getRandomIndexFromArray(arr){
        return Math.floor(Math.random() * arr.length);
    }

    static getDateAsString(theDate, format = null){
        if(!theDate || !theDate instanceof Date) throw new Error("Date given is not instance of Date");
        const date = theDate.getDate();
        const day = Utils.days[theDate.getDay()];
        const dateDisplay = date < 10 ? `0${date}` : date;
        const month = theDate.getMonth()+1;
        const monthDisplay = month < 10 ? `0${month}` : month;
        const year = theDate.getFullYear();
        switch(format){
            case Utils.dateFormats.DayMonthYearHyphens:
                return `${dateDisplay}-${monthDisplay}-${year}`;
            case Utils.dateFormats.DayMonthYearSlash:
                return `${dateDisplay}/${monthDisplay}/${year}`;
            default:
                return `${day} ${date}, ${Utils.months[month]} ${year}`;
        }
    }

    static genUniqueId(){
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    static stringAsDate(dateString, format){
        if(!format) throw new Error("No format given as arguments");
        switch (format) {
            case Utils.dateFormats.DayMonthYearHyphens:
            case Utils.dateFormats.DayMonthYearSlash:
                const date = +dateString.substring(0, 2);
                const month = +dateString.substring(3,5);
                const year = +dateString.substring(6);
                return new Date(year, month-1, date);
            default:
                return dateString;
        }
    }

    //#endregion

    //#region Private methods

    //#endregion

}