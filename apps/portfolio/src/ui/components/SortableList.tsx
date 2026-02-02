import { Flex } from '@hope-ui/solid';
import {
	DragDropProvider,
	DragDropSensors,
	DragEventHandler,
	SortableProvider,
	closestCenter,
	createSortable,
} from '@thisbeyond/solid-dnd';
import { BsArrowsExpand } from 'solid-icons/bs';
import { Accessor, For, JSX } from 'solid-js';

const Sortable = (props: { renderItem: JSX.Element; id: string | number; index: Accessor<number> }) => {
	// eslint-disable-next-line solid/reactivity
	const sortable = createSortable(props.id);
	// const [state] = useDragDropContext() as NonNullable<ReturnType<typeof useDragDropContext>>;
	// console.log(`🚀 ~ Sortable ~ state:`, state);
	return (
		<Flex gap="$2" data-id="SortableList-flex-1-76b973">
			<div
				style={{
					display: 'flex',
					gap: '8px',
					'align-items': 'center',
				}}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				use:sortable
			>
				<BsArrowsExpand />
				{props.index() + 1}
			</div>
			{props.renderItem}
		</Flex>
	);
};

export const SortableVerticalList = <T,>(props: {
	items: T[];
	setItems: (items: T[]) => void;
	renderItem: (item: T, index: Accessor<number>) => JSX.Element;
	getId: (item: T) => string | number;
}) => {
	// const [items, setItems] = createSignal(props.items);
	// const [activeItem, setActiveItem] = createSignal<number | null>(null);
	const ids = () => props.items.map(props.getId);

	// createEffect(() => {
	// 	console.log(props.items);
	// });

	// const onDragStart: DragEventHandler = (e) => {
	//  setActiveItem(draggable.id as number);
	// };

	const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
		if (draggable && droppable) {
			const currentItems = ids();
			const fromIndex = currentItems.indexOf(draggable.id as number);
			const toIndex = currentItems.indexOf(droppable.id as number);
			if (fromIndex !== toIndex) {
				const updatedItems = props.items.slice();
				updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
				props.setItems(updatedItems);
			}
		}
	};

	return (
		<DragDropProvider
			// onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			collisionDetector={closestCenter}
		>
			<DragDropSensors />
			<SortableProvider ids={ids()}>
				<For each={props.items}>
					{(item, index) => (
						<Sortable renderItem={props.renderItem(item, index)} index={index} id={props.getId(item)} />
					)}
				</For>
			</SortableProvider>
		</DragDropProvider>
	);
};
