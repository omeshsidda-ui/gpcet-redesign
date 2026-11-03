<#
.SYNOPSIS
    Orca ADE Multi-Agent Squad Orchestrator for GPCET Web Portal Redesign.
.DESCRIPTION
    Automates the provisioning of isolated Git worktrees and spawns Antigravity CLI (agy)
    in Turbo Mode across the 7 specialized subagents.
.EXAMPLE
    .\scripts\orca-squad.ps1 -Phase 1
    .\scripts\orca-squad.ps1 -Merge 1
    .\scripts\orca-squad.ps1 -Phase 2
    .\scripts\orca-squad.ps1 -Merge 2
    .\scripts\orca-squad.ps1 -Phase 3
    .\scripts\orca-squad.ps1 -Status
#>

[CmdletBinding()]
param(
    [ValidateSet(1, 2, 3)]
    [int]$Phase,

    [ValidateSet(1, 2, 3)]
    [int]$Merge,

    [ValidateSet(1, 2, 3)]
    [int]$Clean,

    [switch]$Status
)

$ErrorActionPreference = "Stop"
$RepoRoot = Resolve-Path "$PSScriptRoot\.."
$OrcaBin = "C:\Users\ajayd\AppData\Local\Programs\orca\resources\bin\orca.exe"
$PromptsDir = "$RepoRoot\.orca\prompts"

if (-not (Test-Path $OrcaBin)) {
    Write-Error "Orca executable not found at $OrcaBin"
    exit 1
}

function Show-Status {
    Write-Host "`n=== Current Orca Worktrees & Agent Sessions ===" -ForegroundColor Cyan
    & $OrcaBin worktree ps
}

if ($Status) {
    Show-Status
    exit 0
}

# ----------------- PHASE MERGES -----------------
if ($Merge) {
    Set-Location $RepoRoot
    switch ($Merge) {
        1 {
            Write-Host "`n[Orca Squad] Merging Phase 1 branches into master..." -ForegroundColor Cyan
            git checkout master
            git merge phase1/agent1-infra --no-ff -m "merge: Phase 1 Agent 1 (Infra, Config, Redirects)"
            git merge phase1/agent2-content --no-ff -m "merge: Phase 1 Agent 2 (Content Pipeline & Markdown AST)"
            git merge phase1/agent3-api --no-ff -m "merge: Phase 1 Agent 3 (API Routes & MiniSearch Index)"
            Write-Host "[Orca Squad] Phase 1 merged successfully into master!" -ForegroundColor Green
        }
        2 {
            Write-Host "`n[Orca Squad] Merging Phase 2 branches into master..." -ForegroundColor Cyan
            git checkout master
            git merge phase2/agent4-shell --no-ff -m "merge: Phase 2 Agent 4 (UI Shell & Anti-Slop Design Tokens)"
            git merge phase2/agent5-pages --no-ff -m "merge: Phase 2 Agent 5 (Institutional Pages & Department Matrix)"
            Write-Host "[Orca Squad] Phase 2 merged successfully into master!" -ForegroundColor Green
        }
        3 {
            Write-Host "`n[Orca Squad] Merging Phase 3 branches into master..." -ForegroundColor Cyan
            git checkout master
            git merge phase3/agent6-admin --no-ff -m "merge: Phase 3 Agent 6 (Staff Admin CMS & Auth)"
            Write-Host "[Orca Squad] Phase 3 merged successfully into master!" -ForegroundColor Green
        }
    }
    exit 0
}

# ----------------- CLEANUP -----------------
if ($Clean) {
    switch ($Clean) {
        1 {
            Write-Host "`n[Orca Squad] Cleaning up Phase 1 worktrees and branches..." -ForegroundColor Yellow
            & $OrcaBin worktree rm --worktree name:phase1-agent1-infra --force 2>$null
            & $OrcaBin worktree rm --worktree name:phase1-agent2-content --force 2>$null
            & $OrcaBin worktree rm --worktree name:phase1-agent3-api --force 2>$null
            git branch -D phase1/agent1-infra 2>$null
            git branch -D phase1/agent2-content 2>$null
            git branch -D phase1/agent3-api 2>$null
            Write-Host "[Orca Squad] Phase 1 cleaned up." -ForegroundColor Green
        }
        2 {
            Write-Host "`n[Orca Squad] Cleaning up Phase 2 worktrees and branches..." -ForegroundColor Yellow
            & $OrcaBin worktree rm --worktree name:phase2-agent4-shell --force 2>$null
            & $OrcaBin worktree rm --worktree name:phase2-agent5-pages --force 2>$null
            git branch -D phase2/agent4-shell 2>$null
            git branch -D phase2/agent5-pages 2>$null
            Write-Host "[Orca Squad] Phase 2 cleaned up." -ForegroundColor Green
        }
        3 {
            Write-Host "`n[Orca Squad] Cleaning up Phase 3 worktrees and branches..." -ForegroundColor Yellow
            & $OrcaBin worktree rm --worktree name:phase3-agent6-admin --force 2>$null
            git branch -D phase3/agent6-admin 2>$null
            Write-Host "[Orca Squad] Phase 3 cleaned up." -ForegroundColor Green
        }
    }
    exit 0
}

# ----------------- LAUNCH PHASES -----------------
switch ($Phase) {
    1 {
        Write-Host "`n=======================================================" -ForegroundColor Cyan
        Write-Host "   DISPATCHING PHASE 1: FOUNDATION, PIPELINE & API" -ForegroundColor Cyan
        Write-Host "=======================================================" -ForegroundColor Cyan
        
        $squad = @(
            @{ Name = "phase1-agent1-infra"; Branch = "phase1/agent1-infra"; Title = "Agent 1: Infra & DevOps"; PromptFile = "$PromptsDir\agent1-infra.md" },
            @{ Name = "phase1-agent2-content"; Branch = "phase1/agent2-content"; Title = "Agent 2: Content Pipeline"; PromptFile = "$PromptsDir\agent2-content.md" },
            @{ Name = "phase1-agent3-api"; Branch = "phase1/agent3-api"; Title = "Agent 3: API & Search"; PromptFile = "$PromptsDir\agent3-api.md" }
        )

        foreach ($agent in $squad) {
            Write-Host "`n[Orca] Creating worktree $($agent.Name)..." -ForegroundColor Green
            & $OrcaBin worktree create --name $agent.Name --branch $agent.Branch --base-branch master --json | Out-Null
            
            Write-Host "[Orca] Spawning terminal for $($agent.Title) running agy (Turbo)..." -ForegroundColor Yellow
            & $OrcaBin terminal create --worktree "name:$($agent.Name)" --title $agent.Title --command "agy --dangerously-skip-permissions --mode accept-edits" --json | Out-Null
            Write-Host "  -> Prompt located at: $($agent.PromptFile)" -ForegroundColor DarkGray
        }

        Write-Host "`n[SUCCESS] Phase 1 squad dispatched! Check Orca ADE window to see all 3 agents running side-by-side." -ForegroundColor Green
        Write-Host "Once all 3 finish, run: .\scripts\orca-squad.ps1 -Merge 1" -ForegroundColor White
    }

    2 {
        Write-Host "`n=======================================================" -ForegroundColor Cyan
        Write-Host "   DISPATCHING PHASE 2: FRONTEND & INSTITUTIONAL UI" -ForegroundColor Cyan
        Write-Host "=======================================================" -ForegroundColor Cyan

        $squad = @(
            @{ Name = "phase2-agent4-shell"; Branch = "phase2/agent4-shell"; Title = "Agent 4: UI Shell & Tokens"; PromptFile = "$PromptsDir\agent4-shell.md" },
            @{ Name = "phase2-agent5-pages"; Branch = "phase2/agent5-pages"; Title = "Agent 5: Page & Dept Builder"; PromptFile = "$PromptsDir\agent5-pages.md" }
        )

        foreach ($agent in $squad) {
            Write-Host "`n[Orca] Creating worktree $($agent.Name)..." -ForegroundColor Green
            & $OrcaBin worktree create --name $agent.Name --branch $agent.Branch --base-branch master --json | Out-Null
            
            Write-Host "[Orca] Spawning terminal for $($agent.Title) running agy (Turbo)..." -ForegroundColor Yellow
            & $OrcaBin terminal create --worktree "name:$($agent.Name)" --title $agent.Title --command "agy --dangerously-skip-permissions --mode accept-edits" --json | Out-Null
            Write-Host "  -> Prompt located at: $($agent.PromptFile)" -ForegroundColor DarkGray
        }

        Write-Host "`n[SUCCESS] Phase 2 squad dispatched! In Orca, you can also launch the live browser tab with:" -ForegroundColor Green
        Write-Host "  orca tab create --url http://localhost:3000" -ForegroundColor White
        Write-Host "Once finished, run: .\scripts\orca-squad.ps1 -Merge 2" -ForegroundColor White
    }

    3 {
        Write-Host "`n=======================================================" -ForegroundColor Cyan
        Write-Host "   DISPATCHING PHASE 3: ADMIN CMS & PRODUCTION QA" -ForegroundColor Cyan
        Write-Host "=======================================================" -ForegroundColor Cyan

        Write-Host "`n[Orca] Step 1: Dispatching Agent 6 (Staff Admin CMS)..." -ForegroundColor Green
        & $OrcaBin worktree create --name phase3-agent6-admin --branch phase3/agent6-admin --base-branch master --json | Out-Null
        & $OrcaBin terminal create --worktree "name:phase3-agent6-admin" --title "Agent 6: Staff Admin CMS" --command "agy --dangerously-skip-permissions --mode accept-edits" --json | Out-Null
        Write-Host "  -> Prompt located at: $PromptsDir\agent6-admin.md" -ForegroundColor DarkGray

        Write-Host "`n[NOTICE] Agent 7 (Security, QA & A11y Auditor) runs directly on the master branch after Agent 6 is merged." -ForegroundColor Yellow
        Write-Host "After Agent 6 settles:" -ForegroundColor White
        Write-Host "  1. Run: .\scripts\orca-squad.ps1 -Merge 3" -ForegroundColor White
        Write-Host "  2. Run: orca terminal create --worktree active --title 'Agent 7: QA & Security' --command 'agy --dangerously-skip-permissions --mode accept-edits'" -ForegroundColor White
        Write-Host "  3. Feed prompt: $PromptsDir\agent7-qa.md" -ForegroundColor White
    }
}
