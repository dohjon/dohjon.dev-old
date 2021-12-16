import { GetStaticProps } from 'next';
import './about.module.css';

import { TopicButton } from '@dohjon.github.io/shared/ui';

export interface AboutProps {
  name: string;
}

export function About({ name }: AboutProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Welcome to About! {name}</h1>
      <TopicButton></TopicButton>
    </div>
  );
}

export const getStaticProps: GetStaticProps<AboutProps> = async (context) => {
  return {
    props: {
      name: 'dohjon',
    },
  };
};

export default About;
