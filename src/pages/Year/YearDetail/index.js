import dayjs from "dayjs";
import './index.scss'
import { useMemo, useState } from "react";
import classNames from "classnames";
import { List } from "antd-mobile";
const YearDetails = ({ year, MonthDetail }) => {
  const [visible, setVisible] = useState(false);
  const monthData = useMemo(() => {
    // 计算当年的收入支出情况
    const pay = MonthDetail.reduce((a, c) => a + c.pay, 0);
    const income = MonthDetail.reduce((a, c) => a + c.income, 0);
    return {
      pay,
      income,
      surplus: income + pay,
    };
  }, [MonthDetail]);

  return (
    <div className={classNames("dailyBill", "expand")}>
      <div className="header">
        <div className="dateIcon" onClick={() => setVisible(!visible)}>
          <span className="date">{year+'年度'}</span>
          {/* expand 有这个类名 展开的箭头朝上的样子 */}
          <span className={classNames("arrow", visible && "expand")}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{monthData.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{monthData.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{monthData.surplus.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      <div className="billList" style={{ display: visible ? "block" : "none" }}>
        {MonthDetail.map((item) => {
          return (
            <List key={item.month_log} style={{ border: "none" }}>
              <List.Item>
                <div className="oneLineOverview">
                {dayjs(item.month_log).format("MM") + "月"}
                  <div className="pay">
                    <span className="type">支出</span>
                    <span className="money">{item.pay}</span>
                  </div>
                  <div className="income">
                    <span className="type">收入</span>
                    <span className="money"> {item.income}</span>
                  </div>
                  <div className="balance">
                    <span className="money">
                    {item.surplus}
                    </span>
                    <span className="type">结余</span>
                  </div>
                </div>
              </List.Item>
            </List>
          );
        })}
      </div>
    </div>
  );
};

export default YearDetails;
