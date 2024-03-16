import React, { useState, useEffect } from "react";
import { setDataInState } from "./redux/actions/trains";
import { useDispatch, useSelector } from "react-redux";
import { InitData, Train } from "./types/interfaces";
import Modal from "./components/Modal/Modal";
import { Characteristics } from "./types/interfaces";
import Characteristic from "./components/Characteristic/Characteristic";
import { url } from "./types/interfaces";

import styles from "../src/styles/Table.module.scss";

export interface Charact {
  [key: string]: Characteristics;
}

export interface CharactState {
  name: string;
  info: Charact;
}

const Table = (): React.ReactElement => {
  const dispatch = useDispatch();
  const data: Train[] = useSelector((data: InitData) => data.data);
  const [visiableWindow, setVisiableWindow] = useState<boolean>(false);
  const [characteristic, setCharacteristic] = useState<CharactState>({
    name: "",
    info: {},
  });

  const openWindow = () => setVisiableWindow(true);
  const cancelWindow = () => setVisiableWindow(false);

  const showCharacteristic = (arr: Characteristics[], name: string) => {
    let obj: Charact = {};
    arr?.map((item: Characteristics, i: number) => (obj[String(i)] = item));
    openWindow();
    setCharacteristic({ name, info: obj });
  };

  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(setDataInState(result)))
      .catch((err) => console.log(err));
  };

  useEffect(() => getData(), []);

  return (
    <div className={styles.wrapper}>
      {visiableWindow && (
        <Modal close={cancelWindow} open={openWindow}>
          <Characteristic characteristic={characteristic} />
        </Modal>
      )}
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr className={styles.trTitle}>
            <th>Поезда</th>
          </tr>
          <tr className={styles.trTitles}>
            <th>Название</th>
            <th>Описание</th>
            <th>Характеристика</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {data?.map((train: Train, index: number) => (
            <tr key={index}>
              <td>{train.name}</td>
              <td>{train.description}</td>
              <td>
                <button
                  onClick={() =>
                    showCharacteristic(train?.characteristics, train.name)
                  }
                  className={styles.btn}
                >
                  Посмотреть
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
