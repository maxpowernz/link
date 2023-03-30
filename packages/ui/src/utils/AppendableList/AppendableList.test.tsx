import { render, screen, userEvent, withFormWrapper } from '../../test/test-utils';
import { z } from 'zod';
import { AppendableList } from './AppendableList';
import { TextInputWidget } from '../../components/form-widgets/TextInput/TextInputWidget';


const schema = z.object({
  names: z.array(z.object({ firstName: z.string(), lastName: z.string() })),
});

describe('AppendableList', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it.each`
    names
    ${[]}
    ${[{ firstName: 'John' }]}
    ${[{ firstName: 'John' }, { firstName: 'Tom' }]}
  `('should render correctly when default fields=$names', async ({ names }) => {
    const question = 'Please enter your names';
    const addButtonLabel = 'Name';
    const name = 'names';

    const props = { question, addButtonLabel, name };

    await render(
      <AppendableList {...props}>
        <TextInputWidget name="name" />
      </AppendableList>,
      { wrapper: withFormWrapper<z.infer<typeof schema>>({ defaultValues: { names } }) }
    );


    expect(screen.queryAllByRole('textbox').length).toBe(names.length);

    const addButton = screen.getByRole('button');
    expect(addButton).toBeInTheDocument();

    await userEvent.click(addButton);

    expect(screen.getAllByRole('textbox').length).toBe(names.length + 1);
    expect(screen.getAllByText(question).length).toBe(1);
  });
});
