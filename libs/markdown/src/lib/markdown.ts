import { readFileSync } from 'fs';
import { join } from 'path';
import * as matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

interface MarkdownContent {
  frontMatter: {
    [key: string]: unknown;
  };
  content: string;
}

export function getParsedFileContentBySlug(
  fileName: string,
  postsPath: string
) {
  const postFilePath = join(postsPath, `${fileName}.mdx`);
  const fileContent = readFileSync(postFilePath);

  const { data, content } = matter(fileContent);
  return {
    frontMatter: data,
    content,
  } as MarkdownContent;
}

export function renderMarkdown(markdownContent: string) {
  return serialize(markdownContent);
}
