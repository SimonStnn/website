"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Award, Trophy, Calendar, ExternalLink, FileBadge } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Achievement } from "@/lib/achievements";
import { cn } from "@/lib/utils";

interface AchievementCardProps {
  achievement: Achievement;
}

const getTypeColor = (type: Achievement["type"]) => {
  switch (type) {
    case "certification":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "award":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "achievement":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const getTypeIcon = (type: Achievement["type"]) => {
  switch (type) {
    case "certification":
      return <FileBadge className="h-4 w-4" />;
    case "award":
      return <Award className="h-4 w-4" />;
    case "achievement":
      return <Trophy className="h-4 w-4" />;
    default:
      return <Award className="h-4 w-4" />;
  }
};

export function AchievementBadge({ achievement }: AchievementCardProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(getTypeColor(achievement.type), "capitalize select-none")}
    >
      {getTypeIcon(achievement.type)}
      {achievement.type}
    </Badge>
  );
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group relative cursor-pointer gap-2.5 transition-all hover:shadow-lg">
          <CardHeader className="grid-rows-1 gap-0">
            <CardAction className="text-muted-foreground flex flex-row-reverse justify-baseline gap-2 text-sm select-none">
              <span className="flex flex-nowrap items-center gap-1">
                <Calendar className="size-4" />
                {achievement.date}
              </span>
              {achievement.link && (
                <Button variant="link" asChild>
                  <Link
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary h-auto justify-start !gap-1 !p-0 text-sm leading-tight transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="size-4" />
                    Cert
                  </Link>
                </Button>
              )}
            </CardAction>
            <AchievementBadge achievement={achievement} />
          </CardHeader>
          <CardContent className="flex gap-2">
            {achievement.image && (
              <Image
                src={achievement.image}
                alt={`${achievement.title} logo`}
                width={40}
                height={40}
                className="border-secondary size-10 rounded-full border object-contain p-0.5"
              />
            )}
            <div>
              <CardTitle className="line-clamp-1 text-lg leading-tight text-pretty">
                {achievement.title}
              </CardTitle>
              <CardDescription className="text-primary line-clamp-1 font-medium">
                {achievement.issuer}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-1 flex items-center gap-2">
            {achievement.image && (
              <Image
                src={achievement.image}
                alt={`${achievement.title} logo`}
                width={36}
                height={36}
                className="border-secondary size-9 rounded-full border object-contain p-0.5"
              />
            )}
            {achievement.title}
          </DialogTitle>
          <div className="flex items-center justify-between">
            <AchievementBadge achievement={achievement} />
            <span className="text-muted-foreground flex items-center gap-1 text-sm">
              <Calendar className="size-4" />
              {achievement.date}
            </span>
          </div>
          <div className="text-primary text-left font-medium">{achievement.issuer}</div>
        </DialogHeader>
        {achievement.description && (
          <DialogDescription className="text-left text-base">
            {achievement.description}
          </DialogDescription>
        )}
        {achievement.link && (
          <DialogFooter>
            <div className="flex justify-end">
              <Button asChild>
                <Link href={achievement.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink />
                  View Certificate
                </Link>
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
