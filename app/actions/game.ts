"use server";

import { prisma } from "@/lib/db";

export async function getBranchSlug(slug: string) {
  const res = prisma.branch.findUnique({
    where: { slug },
    include: {
      chapters: {
        orderBy: {
          order:"asc"
        },
        select: {
          id: true,
          slug: true,
          title: true,
          order: true
        }
      }
    }
  })
  return res
}


export async function getChapterWithNodes(brunchSlug: string, chapterSlug: string, userId?: string) {
  const chapter = await prisma.chapter.findUnique({
    where: {
      slug: chapterSlug,
      branch: {
        slug:brunchSlug
      }
    },
    include: {
      branch: true,
      nodes: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          title: true,
          description: true,
          order: true
        }
      },
      boss: {
        select: {
          id: true,
          title: true,
          hp:true
        }
      }
    },
  })

  if (!chapter) return null
  let completedNodeIds: string[] = []
  if (userId) {
    const completions = await prisma.nodeCompletion.findMany({
      where: {
        progress: {
          userId, chapterId: chapter.id
        }
      },
      select: {
        nodeId:true
      }
    })
    completedNodeIds = completions.map((c) => c.nodeId);
  }

  return {
    ...chapter,
    nodes: chapter.nodes.map((node) => ({
      ...node,
      completed: completedNodeIds.includes(node.id)
    }))
  }
}
