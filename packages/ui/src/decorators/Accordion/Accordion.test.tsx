import { Accordion, AccordionChildProps } from './Accordion';
import { render, screen, userEvent } from '../../test/test-utils';


function Heading(props: AccordionChildProps) {
  console.log({ props });
  return <span data-testid="heading">Heading</span>;
}

function Content(props: AccordionChildProps) {
  console.log({ props });
  return <span data-testid="content">Content</span>;
}

describe('decorators/Accordion', () => {
  it.each`
    isDefaultOpen
    ${true}
    ${false}
  `('should render and operate correctly when default open=$isDefaultOpen', async ({ isDefaultOpen }) => {
    const user = userEvent.setup();
    const onShowFn = vi.fn();
    render(
      <Accordion isDefaultOpen={isDefaultOpen} onShow={onShowFn}>
        <Accordion.Heading render={(props: JSX.IntrinsicAttributes & AccordionChildProps) => <Heading {...props} />} />
        <Accordion.Content render={(props: JSX.IntrinsicAttributes & AccordionChildProps) => <Content {...props} />} />
      </Accordion>
    );

    const heading = screen.getByTestId('heading');
    await user.click(heading);
    expect(onShowFn).toHaveBeenCalledWith(!isDefaultOpen);
  });
});
