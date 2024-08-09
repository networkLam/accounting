import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import DailyBill from "./components/DailyBill";
const Month = () => {
  // 按月做數據的分組
  const billList = useSelector((state) => state.Bill.billList);
  const monthGroup = useMemo(() => {
    // return出去計算后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  //控制日期选择器展示
  const [dateVisible, setDateVisible] = useState(false);
  //格式化选择的日期
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });
  const [currentMothList, setMonthList] = useState([]);
  const choiceDate = (date) => {
    setDateVisible(false);
    const formatDate = dayjs(date).format("YYYY-MM");
    // monthGroup是一个对象，从对象中选择一个给定的日期
    setMonthList(monthGroup[formatDate]);
    setCurrentDate(formatDate);
  };

 const financeState = useMemo(() => {
    // 从当前给定的日期中计算支出和收入并进行累加
    const pay = currentMothList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = currentMothList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);

    return {
      pay,
      income,
      surplus: pay + income,
    };
  }, [currentMothList]);

//   初始化展示当前月的账单数据
  useEffect(()=>{
    const nowdays = dayjs().format("YYYY-MM");
    // 避免取到空值，控制一下
    if(monthGroup[nowdays]){
         setMonthList(monthGroup[nowdays])
    }
  },[monthGroup])

//   按照当前月给每日做分作
const dayGroup= useMemo(()=>{
    const gropData = _.groupBy(currentMothList,(item)=>dayjs(item.date).format("YYYY-MM-DD"))
    const keys = Object.keys(gropData);
    return {
        gropData,
        keys
    }
},[currentMothList])
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentDate + ""}月账单</span>
            {/* 小箭頭的朝向 */}
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{financeState.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{financeState.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{financeState.surplus.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={choiceDate}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
        {/* 单日的统计 */}
        {
            dayGroup.keys.map(key=>{
                return  <DailyBill key={key} dateText={key} billList={dayGroup.gropData[key]}/>
            })
        }
       
      </div>
    </div>
  );
};

export default Month;
