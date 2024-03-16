import { useState, useEffect } from "react";
import ItemCharact from "../ItemCharact/ItemCharact";
import { Charact } from "../../Table";
import { Characteristics } from "../../types/interfaces";
import { CharactState } from "../../Table";
import styles from "./Characteristic.module.scss";

interface IProps {
  characteristic: CharactState;
}

const Characteristic = ({ characteristic }: IProps): React.ReactElement => {
  const [data, setData] = useState<Charact>(characteristic?.info);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  const enterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    const id = e.target.dataset.id ?? "";
    setData({ ...data, [id]: { ...data[id], [name]: value } });
  };

  useEffect(() => {
    // при данных условиях нет побочных рендеров
    const invalidsInput = document.body.querySelectorAll(".unvalidVal");
    if (invalidsInput.length && !disabledBtn) {
      setDisabledBtn(true);
    }
    if (!invalidsInput.length && disabledBtn) {
      setDisabledBtn(false);
    }
  }, [data]);

  const sendData = () => {
    const initData = Object.values({...data})
    const onlyNumArr = initData.map(item => +item.speed)
    const sortingForce = onlyNumArr.sort((a: number, b: number) =>  a < b ? -1 : 1)
    console.log(sortingForce)
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr className={styles.trTitle}>
            <th>Характеристики</th>
          </tr>
          <tr className={styles.trTitle}>
            <th>{characteristic?.name}</th>
          </tr>
          <tr className={styles.trTitles}>
            <th>Ток двигателя</th>
            <th>Сила тяги</th>
            <th>Скорость</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {Object.values(data)?.map((item: Characteristics, i: number) => (
            <ItemCharact
              key={i}
              id={String(i)}
              item={item}
              enterValue={enterValue}
            />
          ))}
        </tbody>
      </table>
      <button
        onClick={sendData}
        disabled={disabledBtn}
        className={styles.sendData}
      >
        Отправить данные
      </button>
    </div>
  );
};
export default Characteristic;
