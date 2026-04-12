import { FC } from 'react';
import {TITLE_DETAIL_ROW_TABLE, TITLE_DETAIL_ROW_TABLE_CLASS} from '../../../consts';
import { addSpaceToNumber } from '../../../utils/untils';
import { Modal } from 'shared/ui/modal';
import { MainItem } from 'entities/automatization';
import './modal-analis-block.scss';



interface Props {
  isModal  : boolean
  filtred  : MainItem[]
  onCancel : () => void
  onOk     : () => void
}

export const ModalAnalisBlock: FC<Props> = ({ isModal, filtred, onCancel, onOk }) => {
  return (
    <Modal
      title    = 'Станции в проекте'
      isModal  = {isModal}
      onCancel = {onCancel}
      onOk     = {onOk}
    >
      <div className='tableWrapper'>
        <table className='tableFixedHead'>
          <thead className='bt-sticky-header'>
            <tr>
              {TITLE_DETAIL_ROW_TABLE.map((item, i) => <th
                key={item + i}
                className={TITLE_DETAIL_ROW_TABLE_CLASS[i]}
              >
                {item}
              </th> )}
            </tr>
          </thead>
          <tbody>
            {filtred.map( (item, i) => (
              <tr key={`${item.result}-${i}`}>
                <td className='dOrganization'>{item.organization}</td>
                <td className='dSiteId'>{item.siteID}</td>
                <td className='dSumMbCost'>{addSpaceToNumber(item.mbCostCorrect || 0, 2, ',')} р.</td>
                <td className='dSumSpCost'>{item.spCostTraffic ? addSpaceToNumber(item.spCostTraffic, 2, ',') + ' р.' : '-'}</td>
                <td className='dResult'>{item.result} р.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}
