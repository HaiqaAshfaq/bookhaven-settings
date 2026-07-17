# AI Development Workflow Comparison

## Overview

This project compared two different AI-assisted development workflows by building the same settings form feature twice. The first implementation used a vague prompt with minimal instructions, while the second implementation used a detailed prompt with requirements, planning, testing, and verification steps.

## Round 1: Vague Prompt

In the first round, I provided a simple prompt asking the AI to build a settings form with validation. The AI generated an implementation with limited context about project structure, testing requirements, accessibility, and edge cases.

The result required more manual review because important details had to be checked by the developer. The implementation focused mainly on making the feature work, but it did not include the same level of validation separation, automated testing, or project-specific rules.

## Round 2: Precise Prompt

In the second round, I provided a structured prompt with clear requirements, constraints, and a verification workflow. I asked the AI to plan the implementation, write the code, create tests, and review the result.

The second implementation introduced a separate validation module (`src/validation.ts`) containing reusable validation functions and added automated tests (`src/validation.test.ts`). The project also gained a `CLAUDE.md` file containing specific development rules for future AI-assisted work.

## Comparison

### Correctness

Round 2 produced a more reliable implementation because validation logic was separated into its own file and covered with tests. The diff shows 73 new lines in `validation.ts` and 121 lines added in `validation.test.ts`, which were missing from Round 1.

### Accessibility

The second workflow encouraged consideration of better form structure, clearer user feedback, and improved usability. The updated `App.tsx` and styling changes in `App.css` created a more complete user interface compared to the first attempt.

### Edge Cases

Round 2 handled more user input scenarios, including required fields, invalid email formats, password requirements, and password confirmation checks. These cases were easier to verify because validation logic was isolated and tested.

### Review Effort

Although Round 2 required more detailed prompting initially, it reduced the amount of debugging and manual checking afterward. The verification step helped identify issues earlier and created more confidence in the final implementation.

## AI Mistake Found

During review, I tested the generated form instead of assuming the AI output was correct. I found that some behavior needed additional checking during validation and corrected issues after testing different input cases. This showed the importance of verifying AI-generated code rather than accepting it immediately.

## Conclusion

This comparison demonstrated that effective AI development depends on providing clear requirements, using planning steps, and verifying results. A precise AI workflow produced better structured code, improved reliability, and reduced overall review effort compared to a single vague prompt.