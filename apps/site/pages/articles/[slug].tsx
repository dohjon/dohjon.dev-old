import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';
import {
  getParsedFileContentBySlug,
  renderMarkdown,
} from '@dohjon.github.io/markdown';

export interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

const mdxElements = {
  Youtube: dynamic(
    () => import('@dohjon.github.io/shared/mdx-elements/youtube/youtube')
  ),
  a: dynamic(
    () =>
      import('@dohjon.github.io/shared/mdx-elements/custom-link/custom-link')
  ),
};

const POSTS_PATH = join(process.cwd(), process.env.articleMarkdownPath);

export function Article({ frontMatter, html }) {
  return (
    <article>
      <h1>Welcome to Slug!</h1>
      <div>Article by {frontMatter.title}</div>
      <hr />
      <div>
        <MDXRemote {...html} components={mdxElements}></MDXRemote>
      </div>
    </article>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  const renderHTML = await renderMarkdown(articleMarkdownContent.content);

  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
      html: renderHTML,
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Article;
