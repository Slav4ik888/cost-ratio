import { FC, useCallback } from 'react';
import cl from 'classnames';
import { getTitle } from '../../../utils/untils';
import { BIG_TITLE, BIG_TITLE_CLASS, BIG_SORT } from '../../../consts';
import _ from 'lodash';
import { MainItem } from 'entities/automatization';
import { Sorted } from 'shared/types';
import './index.scss'; 



interface Props {
	sorted 						   : Sorted<typeof BIG_TITLE[number], MainItem | null>
	tableArrFiltred      : MainItem[]
	onSetSorted          : (sorted: Sorted<typeof BIG_TITLE[number], MainItem | null>) => void
	onSetTableArrFiltred : (arr: MainItem[]) => void
}

export const BigTableTableHead: FC<Props> = ({ sorted, tableArrFiltred, onSetSorted, onSetTableArrFiltred }) => {
	// Сортировка "Таблицы"
	const handleSortTabl = useCallback((e: any, sortField: string) => {
		const title         = getTitle(sortField, BIG_TITLE, BIG_SORT);
		const newSortedType = sorted.sortField === title ? (sorted.sortType === 'asc' ? 'desc' : 'asc') : 'asc';
		const orderedData   = _.orderBy(tableArrFiltred, title, newSortedType);
		
		onSetSorted({
			...sorted,
			sortType: newSortedType,
			sortField: title
		});
		onSetTableArrFiltred(orderedData);
	},
		[tableArrFiltred, sorted, onSetSorted, onSetTableArrFiltred]
	);


	return (
		<thead>
			<tr>
				{BIG_TITLE.map((titleField, i) => <th
					key={titleField + i} 
					onClick={(е) => handleSortTabl(е, titleField)}
					className={cl(
						{ ['active']: sorted.sortField === BIG_SORT[i] },
						BIG_TITLE_CLASS[i]
					)}
				>
					{titleField} 
					{sorted.sortField === BIG_SORT[i] ? 
						sorted.sortType === 'asc'  ? ' ▲' : 
						sorted.sortType === 'desc' ? ' ▼' : null : null}
				</th>)}
			</tr>
		</thead>
	)
}
