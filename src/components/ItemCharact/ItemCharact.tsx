import { Characteristics } from "../../types/interfaces";
import classNames from "classnames";

import styles from "./ItemCharact.module.scss";

interface IProps {
  id: string;
  item: Characteristics;
  enterValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ItemCharact = ({ id, item, enterValue }: IProps): React.ReactElement => {
  return (
    <tr className={styles.tr}>
      <td>
        <input
          type="text"
          data-id={id}
          value={item?.engineAmperage}
          name="engineAmperage"
          onChange={enterValue}
          className={classNames({
            unvalidVal:
              (!+item.engineAmperage && +item.engineAmperage < 1) ||
              String(item?.engineAmperage) === "" ||
              !/^[0-9]*$/.test(String(item?.engineAmperage)),
          })}
        />
      </td>
      <td>
        <input
          type="text"
          data-id={id}
          value={item?.force}
          name="force"
          onChange={enterValue}
          className={classNames({
            unvalidVal: isNaN(item.force) || Number.isInteger(+item.force),
          })}
        />
      </td>
      <td>
        {" "}
        <input
          type="text"
          data-id={id}
          value={item?.speed}
          name="speed"
          onChange={enterValue}
          className={classNames({
            unvalidVal:
              (!+item.speed && +item.speed !== 0) ||
              String(item?.speed) === "" ||
              !/^[0-9]*$/.test(String(item?.speed)),
          })}
        />
      </td>
    </tr>
  );
};
export default ItemCharact;
