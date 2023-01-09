import { render, screen, within } from 'testUtils';
import userEvent from '@testing-library/user-event';
import { Model, defaultModel } from '@alephdata/followthemoney';
import TimelineList from './TimelineList';

const model = new Model(defaultModel);

const event1 = model.getEntity({
  id: '1',
  schema: 'Event',
  properties: {
    startDate: ['2022-01-01'],
  },
});

const event2 = model.getEntity({
  id: '2',
  schema: 'Event',
  properties: {
    startDate: ['2022-02-01'],
  },
});

const event3 = model.getEntity({
  id: '3',
  schema: 'Event',
  properties: {
    startDate: ['2022-03-01'],
  },
});

it('supports navigating the list using arrow keys', async () => {
  const entities = [event1, event2, event3];
  const layout = { vertices: [] };

  render(
    <TimelineList
      entities={entities}
      layout={layout}
      onSelect={() => {}}
      onRemove={() => {}}
    />
  );

  const items = screen
    .getAllByRole('listitem')
    .map((item) => item.querySelector('div') as HTMLElement);

  // Tab to focus first item
  await userEvent.keyboard('{Tab}');
  expect(document.activeElement).toBe(items[0]);

  // Tab again to focus "remove" button
  await userEvent.keyboard('{Tab}');
  expect(document.activeElement).toBe(
    within(items[0]).getByRole('button', { name: 'Remove' })
  );

  // Arrow up focuses first item (as there is no prev item)
  await userEvent.keyboard('{ArrowUp}');
  expect(document.activeElement).toBe(items[0]);

  // Focus next items, twice
  await userEvent.keyboard('{ArrowDown}{ArrowDown}');
  expect(document.activeElement).toBe(items[2]);

  // Tab to focus "remove" button
  await userEvent.keyboard('{Tab}');
  expect(document.activeElement).toBe(
    within(items[2]).getByRole('button', { name: 'Remove' })
  );

  // Arrow down focus last item (as there is no next item)
  await userEvent.keyboard('{ArrowDown}');
  expect(document.activeElement).toBe(items[2]);
});
