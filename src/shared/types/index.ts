import { BIG_TITLE } from 'consts';
import { MainItem } from 'entities/automatization';



export interface Sorted<S, T> {
	sortType   : 'asc' | 'desc'
	sortField  : S // поле по умолчанию
	row        : T // нажатая выбранная строка
}
