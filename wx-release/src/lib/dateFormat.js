
export default (date,type='Y-M-D')=>{
    let d=new Date(date||null)
    let _year=d.getFullYear()
    let _month=getFullNum(d.getMonth()+1)
    let _date=getFullNum(d.getDate())
    let _hour=getFullNum(d.getHours())
    let _minutes=getFullNum(d.getMinutes())
    let _seconds=getFullNum(d.getSeconds())

    function getFullNum(num){
        return num<10?'0'+num:num
    }
    if(type=='all'){
        return `${_year}-${_month}-${_date} ${_hour}:${_minutes}:${_seconds}`
    }else if(type=='Y-M-D'){
        return `${_year}-${_month}-${_date}`
    }
}

