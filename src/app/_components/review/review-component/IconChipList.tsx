import { IconChipListProps } from '@/types/review/ReviewProps';
import IconContainer from '@/app/_components/review/review-component/IconContainer';
import { Chip, Stack } from '@mui/material';
import { v4 } from 'uuid';
import { useMemo } from 'react';

export enum IconChip {
  wantToGo = 1,
  helped = 2,
  great = 3,
  funny = 4,
}

function getItem(
  item: {
    type: 'wantToGo' | 'helped' | 'great' | 'funny';
    count: number;
  }[],
  myReaction: string | null,
) {
  if (!myReaction) {
    return item;
  }

  return item.map(value => {
    if (value.type === myReaction) {
      return {
        ...value,
        count: value.count + 1,
      };
    }
    return value;
  });
}

function IconChipList({ item, myReaction }: IconChipListProps) {
  const newItem = useMemo(
    () => getItem(item, myReaction),
    [item, myReaction],
  ).sort((a, b) => b.count - a.count);
  return (
    <Stack className="mt-2" direction="row" spacing={1}>
      {newItem
        .filter(value => value.count !== 0)
        .map(value => {
          const { count, type } = value;
          return (
            <Chip
              key={v4()}
              className="shadow p-1"
              avatar={<IconContainer value={IconChip[type]} />}
              variant="outlined"
              label={count}
            />
          );
        })}
    </Stack>
  );
}

export default IconChipList;
