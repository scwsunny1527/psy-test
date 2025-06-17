'use client';
import { DatePicker } from 'antd';
import CalenderPage from '@/component/others/CalenderPage'


export default function TestUI() {
  

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    alert("你選的是: " + dateString);
  };

  const days = [
    {year:"2025", month:"五月", day:"01", weekDay:"星期四"},
    {year:"2025", month:"五月", day:"02", weekDay:"星期五"},
    {year:"2025", month:"五月", day:"03", weekDay:"星期六"},
    {year:"2025", month:"五月", day:"04", weekDay:"星期日"},
    {year:"2025", month:"五月", day:"05", weekDay:"星期一"},
    {year:"2025", month:"五月", day:"06", weekDay:"星期二"},
    {year:"2025", month:"五月", day:"07", weekDay:"星期三"},
    {year:"2025", month:"五月", day:"08", weekDay:"星期四"}
  ]

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center gap-5 flex-wrap overflow-auto">
      {/* <DatePicker onChange={onChange} needConfirm /> */}
      <CalenderPage year="2025" month="五月" day="01" weekDay="星期四"></CalenderPage>
      <CalenderPage year="2025" month="五月" day="02" weekDay="星期五"></CalenderPage>
      <CalenderPage year="2025" month="五月" day="03" weekDay="星期六"></CalenderPage>
      <CalenderPage year="2025" month="五月" day="04" weekDay="星期日"></CalenderPage>
      <CalenderPage year="2025" month="五月" day="05" weekDay="星期一"></CalenderPage>
      <CalenderPage year="2025" month="五月" day="06" weekDay="星期二"></CalenderPage>
      <CalenderPage year="2025" month="五月" day="07" weekDay="星期三"></CalenderPage>
      <CalenderPage year="2025" month="五月" day="08" weekDay="星期四"></CalenderPage>
      
      {
        days.map((day, index) => (
          <CalenderPage key={"cal" + index} year={day.year} month={day.month} day={day.day} weekDay={day.weekDay}></CalenderPage>
        ))
      }

    </div>
  );
}
