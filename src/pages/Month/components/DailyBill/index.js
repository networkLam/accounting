import classNames from "classnames";
import { useState } from "react";
import { useMemo } from "react";
import { billTypeToName } from '@/contants/index'
import Icon from '@/components/Icon'
import "./index.scss";

const DailyBill = ({ dateText, overview, billList }) => {
  
 const dayResult = useMemo(() => {
  // 从当前给定的日期中计算支出和收入并进行累加
  const pay = billList
    .filter((item) => item.type === "pay")
    .reduce((a, c) => a + c.money, 0);
  const income = billList
    .filter((item) => item.type === "income")
    .reduce((a, c) => a + c.money, 0);

  return {
    pay,
    income,
    surplus: pay + income,
  };
}, [billList]);
  const [visible, setVisible] = useState(false)
  return (
    <div className={classNames("dailyBill", "expand")}>
      <div className="header">
      <div className="dateIcon" onClick={() => setVisible(!visible)}>
          <span className="date">{dateText}</span>
          {/* expand 有这个类名 展开的箭头朝上的样子 */}
          <span className={classNames('arrow',visible && 'expand')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.surplus.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>

      <div className="billList" style={{ display: visible ? 'block' : 'none' }}>
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              {/* 图标 */}
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default DailyBill;
