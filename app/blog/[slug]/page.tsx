import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JetBrains_Mono } from 'next/font/google';
import Balancer from 'react-wrap-balancer';

import { allBlogs } from 'contentlayer/generated';

import ViewCounter from '@/app/blog/view-counter';
import { getTweets } from '@/lib/twitter';
import { getViewsCount } from '@/lib/metrics';
import { Mdx } from '@/components/mdx';

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export async function generateMetadata({
	params,
}): Promise<Metadata | undefined> {
	const post = allBlogs.find((post) => post.slug === params.slug);
	if (!post) {
		return;
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
		slug,
	} = post;
	const ogImage = image
		? `https://ndrws.dev${image}`
		: `https://ndrws.dev/og?title=${title}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `https://ndrws.dev/blog/${slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

function formatDate(date: string) {
	const currentDate = new Date();
	const targetDate = new Date(date);

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = '';

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = 'Today';
	}

	const fullDate = targetDate.toLocaleString('en-us', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});

	return `${fullDate} (${formattedDate})`;
}

export default async function Blog({ params }) {
	const post = allBlogs.find((post) => post.slug === params.slug);

	if (!post) {
		notFound();
	}

	const [allViews, tweets] = await Promise.all([
		getViewsCount(),
		getTweets(post.tweetIds),
	]);

	return (
		<div className="max-w-2xl m-auto">
			<section>
				<script type="application/ld+json" suppressHydrationWarning>
					{JSON.stringify(post.structuredData)}
				</script>
				<h1 className="font-bold text-2xl tracking-tighter max-w-[650px]">
					<Balancer>{post.title}</Balancer>
				</h1>
				<div
					style={jetBrainsMono.style}
					className="flex justify-between items-center text-sm mt-2 
					mb-8"
				>
					<p className="text-xs text-muted-foreground">
						{formatDate(post.publishedAt)}
					</p>
					<ViewCounter allViews={allViews} slug={post.slug} trackView />
				</div>
				<Mdx code={post.body.code} tweets={tweets} />
			</section>
		</div>
	);
}
