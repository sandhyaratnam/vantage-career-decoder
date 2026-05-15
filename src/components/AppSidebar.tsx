import { Link, useRouterState } from "@tanstack/react-router";
import { ClipboardList, Sparkles, GitCompareArrows, FileSearch, Briefcase, MessagesSquare, Compass, UserCircle2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAppState } from "@/lib/store";
import { surveyQuestions } from "@/lib/career-data";

const flow = [
  { step: "01", title: "Survey", url: "/", icon: ClipboardList },
  { step: "02", title: "Matches", url: "/matches", icon: Sparkles },
  { step: "03", title: "Compare", url: "/compare", icon: GitCompareArrows },
  { step: "04", title: "JD Analysis", url: "/jd-analysis", icon: FileSearch },
  { step: "05", title: "Applications", url: "/applications", icon: Briefcase },
  { step: "06", title: "Interview Prep", url: "/interview-prep", icon: MessagesSquare },
];

export function AppSidebar() {
  const { state: sbState } = useSidebar();
  const collapsed = sbState === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { state } = useAppState();

  const surveyDone = Object.keys(state.answers).length;
  const surveyTotal = surveyQuestions.length;

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="px-4 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-sidebar-primary grid place-items-center shadow-elevated shrink-0">
            <Compass className="size-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-display text-lg font-bold tracking-tight text-sidebar-foreground">VANTAGE</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/50">Career decoder</div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/40">
            The Flow
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {flow.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title} className="h-11 rounded-lg data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground">
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="size-4 shrink-0" />
                        {!collapsed && (
                          <div className="flex items-baseline justify-between flex-1 min-w-0">
                            <span className="text-sm">{item.title}</span>
                            <span className="text-[10px] font-mono text-sidebar-foreground/40">{item.step}</span>
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Profile — pinned below the flow */}
        <SidebarGroup className="mt-auto pt-2">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/profile"} tooltip="Profile" className="h-11 rounded-lg data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground">
                  <Link to="/profile" className="flex items-center gap-3">
                    <UserCircle2 className="size-4 shrink-0" />
                    {!collapsed && <span className="text-sm">Profile</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="p-3">
          <div className="rounded-xl bg-sidebar-accent/60 p-4 border border-sidebar-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/50">Survey</span>
              <span className="text-xs font-mono text-sidebar-primary">
                {surveyDone}/{surveyTotal}
              </span>
            </div>
            <div className="h-1 rounded-full bg-sidebar-border overflow-hidden">
              <div
                className="h-full bg-sidebar-primary transition-all"
                style={{ width: `${(surveyDone / surveyTotal) * 100}%` }}
              />
            </div>
            <div className="text-[11px] text-sidebar-foreground/60 mt-3 leading-relaxed">
              {surveyDone === 0
                ? "Start with the survey to unlock matches."
                : surveyDone < surveyTotal
                  ? "Keep going — fit improves with every answer."
                  : "Survey complete. Your matches are live."}
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
