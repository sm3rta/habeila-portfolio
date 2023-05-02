import { Box } from '@hope-ui/solid';
import {
	DragDropProvider,
	DragDropSensors,
	DragEventHandler,
	SortableProvider,
	closestCenter,
	createSortable,
	useDragDropContext,
} from '@thisbeyond/solid-dnd';
import { BsArrowsExpand } from 'solid-icons/bs';
import { For, JSX, createEffect } from 'solid-js';

const Sortable = (props: { renderItem: JSX.Element; id: string | number }) => {
	// eslint-disable-next-line solid/reactivity
	const sortable = createSortable(props.id);
	const [state] = useDragDropContext() as NonNullable<ReturnType<typeof useDragDropContext>>;
	return (
		<div
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			use:sortable
			class="sortable"
			classList={{
				'opacity-25': sortable.isActiveDraggable,
				'transition-transform': !!state.active.draggable,
			}}
		>
			<Box display="flex" gap="$2" alignItems="center">
				<BsArrowsExpand />
				{props.renderItem}
			</Box>
		</div>
	);
};

export const SortableVerticalList = <T,>(props: {
	items: T[];
	setItems: (items: T[]) => void;
	renderItem: (item: T, index: () => number) => JSX.Element;
	getId: (item: T) => string | number;
}) => {
	// const [items, setItems] = createSignal(props.items);
	// const [activeItem, setActiveItem] = createSignal<number | null>(null);
	const ids = () => props.items.map(props.getId);

	createEffect(() => {
		console.log(props.items);
	});

	// const onDragStart: DragEventHandler = ({ draggable }) => setActiveItem(draggable.id as number);

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
					{(item, index) => <Sortable renderItem={props.renderItem(item, index)} id={props.getId(item)} />}
				</For>
			</SortableProvider>
		</DragDropProvider>
	);
};
