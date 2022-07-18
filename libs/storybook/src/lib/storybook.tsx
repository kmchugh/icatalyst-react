import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface StorybookProps {}

const StyledStorybook = styled.div`
  color: pink;
`;

export function Storybook(props: StorybookProps) {
  return (
    <StyledStorybook>
      <h1>Welcome to Storybook!</h1>
    </StyledStorybook>
  );
}

export default Storybook;
