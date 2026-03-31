import { FC } from 'react';
import {TITLE_DETAIL_ROW_TABLE} from '../../../consts';
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
      <table className='table' >
        <thead>
          <tr>
            {TITLE_DETAIL_ROW_TABLE.map( (item, i) => <th key={item+i} className='thTitle'>
              {item}
            </th> )}
          </tr>
        </thead>
        <tbody>
          {filtred.map( (item, i) => (
            <tr key={`${item.result}-${i}`}>
              <td className='tdOrganization'>{item.organization}</td>
              <td className='tdSiteID'>{item.siteID}</td>
              <td className='tdMbCostCorrect'>{addSpaceToNumber(item.mbCostCorrect || 0, 2, ',')} р.</td>
              <td className='tdSpCostTraffic'>{item.spCostTraffic ? addSpaceToNumber(item.spCostTraffic, 2, ',') + ' р.' : '-'}</td>
              <td className='tdResult'>{item.result} р.</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  )
}
