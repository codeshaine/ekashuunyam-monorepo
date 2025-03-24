export default function Hack() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-[#191919] p-8 text-white">
      <div className="flex max-w-2xl flex-col items-start justify-center">
        <h1 className="my-8 text-5xl font-bold text-gray-100">
          Project Seraphim
        </h1>
        <section className="mb-5">
          <h2 className="mb-4 text-xl font-semibold text-gray-200">
            Event Overview
          </h2>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <span className="font-medium text-gray-300">Name:</span> Seraphim
              ( Mini Hackathon )
            </li>
            <li>
              <span className="font-medium text-gray-300">Duration:</span> 3
              hours (for coding, but may vary)
            </li>
            <li>
              <span className="font-medium text-gray-300">Objective:</span>{" "}
              Rapidly prototype solutions that combine creativity, technical
              skill, and real-world impact.
            </li>
          </ul>
        </section>
        <section className="mb-5">
          <h2 className="mb-4 text-xl font-semibold text-gray-200">
            Rules & Regulations
          </h2>
          <ol className="list-decimal space-y-5 pl-6">
            <li className="text-gray-300">
              <span className="font-medium">Team Size:</span> Strictly 2 members
              per team.
            </li>
            <li className="text-gray-300">
              <span className="font-medium">Code Freshness:</span>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>Start from an empty folder/IDE.</li>
                <li>No reuse of old code.</li>
              </ul>
            </li>
            <li className="text-gray-300">
              <span className="font-medium">Tech Stack:</span> Any
              language/framework permitted (e.g., JavaScript,Go, React,
              Flutter).
            </li>
            <li className="text-gray-300">
              <span className="font-medium">AI Usage:</span>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  The use of GitHub Copilot, Tabnine, and similar tools for code
                  completion and suggestions is allowed.
                </li>

                <li>
                  AI tools like ChatGPT, Claude, and Gemini may be used for idea
                  generation, error fixing, and research.
                </li>
                <li>
                  Cursor, Devin, Lovable, and other AI-powered autonomous
                  development tools are NOT allowed.
                </li>
                <li>
                  AI-generated full codebases or pre-built solutions are
                  strictly prohibited.
                </li>
              </ul>
            </li>
            <li className="text-gray-300">
              <span className="font-medium">Internet Access:</span> Allowed for
              research, tutorials, and AI tools.
            </li>
            <li className="text-gray-300">
              <span className="font-medium">Progress Tracking:</span>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  Git recommended (alternatives accepted:cloud-based IDEs,
                  time-stamped folders).
                </li>
              </ul>
            </li>
            <li className="text-gray-300">
              <span className="font-medium">Presentation:</span>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>3-5 minute live demo (strict cutoff).</li>
                <li>
                  Maximum 3 slides focus on problem, solution, and future
                  scope(optional).
                </li>
              </ul>
            </li>
          </ol>
        </section>
        <section className="mb-5">
          <h2 className="mb-4 text-xl font-semibold text-gray-200">
            Problem Statements
          </h2>

          <div className="mb-6">
            <h3 className="mb-3 text-xl font-medium text-gray-300">
              1. Income-Generating Web/Mobile Apps
            </h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Goal:</span> Build an app/website
                with a clear monetization strategy.
              </li>
              <li>
                <span className="font-medium">Examples:</span>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Subscription-based fitness app with workout plans</li>
                  <li>
                    Membership site for exclusive content (recipes, parenting
                    tips, etc.)
                  </li>
                  <li>Mobile game with in-app purchases</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-xl font-medium text-gray-300">
              2. Problem-Solving APIs
            </h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Goal:</span> Develop an API that
                addresses a real-world problem simply.
              </li>
              <li>
                <span className="font-medium">Examples:</span>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Text-to-Emoji translator API.</li>
                  <li>Air quality predictor using location data.</li>
                  <li>AI meme generator for social media managers.</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-xl font-medium text-gray-300">
              3. Developer Tools/Libraries
            </h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">Goal:</span> Create tools that
                streamline developer workflows.
              </li>
              <li>
                <span className="font-medium">Examples:</span>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>CLI tool for bulk file renaming/formatting.</li>
                  <li>VS Code extension for real-time code quality checks.</li>
                  <li>Simplified HTTP request tool like httpie</li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
        <section className="mb-5">
          <h2 className="mb-4 text-xl font-semibold text-gray-200">
            Progress Tracking Alternatives
          </h2>
          <p className="mb-3 text-gray-400">(if Git is not used):</p>
          <ul className="list-disc space-y-2 pl-6">
            <li className="text-gray-300">
              Cloud-based IDEs (e.g., Replit, CodeSandbox) with auto-save
              history.
            </li>
            <li className="text-gray-300">
              Time-stamped folders (e.g., &quot;1hr_Progress&quot;,
              &quot;2hr_Progress&quot;).
            </li>
          </ul>
        </section>
        <section className="mb-5">
          <h2 className="mb-4 text-xl font-semibold text-gray-200">
            Judging Criteria
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li className="text-gray-300">
              <span className="font-medium">Creativity (40%):</span> Uniqueness
              and innovation of the idea.
            </li>
            <li className="text-gray-300">
              <span className="font-medium">Presentation (20%):</span> Clarity
              of demo and slides (storytelling over features).
            </li>
            <li className="text-gray-300">
              <span className="font-medium">Implementation (20%):</span> MVP
              completeness and technical execution.
            </li>
            <li className="text-gray-300">
              <span className="font-medium">UI/UX (10%):</span> User-friendly
              design (functionality prioritized).
            </li>
            <li className="text-gray-300">
              <span className="font-medium">Code Quality (10%):</span>{" "}
              Readability, structure, and documentation.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-200">
            Final Submission
          </h2>
          <p className="text-gray-300">
            Ensure all code, documentation, and progress evidence are submitted
            at the 3-hour mark. The proper event schedule will be shared a day
            before the event.
          </p>
        </section>
        <hr className="my-12 border-gray-700" />
      </div>
    </div>
  );
}
