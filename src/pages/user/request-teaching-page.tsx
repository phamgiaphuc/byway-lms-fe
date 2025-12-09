import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

const IntroductionSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">1. Introduction</h2>
      <p className="leading-6">
        We value our reputation for providing the highest quality of education within an
        international context. We believe that every child matters. All gifts and talents are
        recognised and nurtured so that pupils are prepared to become responsible, caring, active
        members of a global community in the twenty-first century.
      </p>
      <span className="font-medium uppercase">School Aims</span>
      <ul className="ml-4 list-inside list-disc space-y-1">
        <li>
          To create a learning environment that challenges and supports pupils to achieve high
          standards in the pursuit of excellence.
        </li>
        <li>
          To create a supportive, interactive educational environment that will promote the
          development of independent, life-long learners.
        </li>
        <li>
          To recognize the importance of the technological world in which we live, and therefore to
          embrace new technology and to make it an integral part of teaching and learning across the
          curriculum.
        </li>
        <li>
          To promote opportunities for communication, collaboration, creativity and critical
          thinking in all aspects of teaching and learning.
        </li>
        <li>
          In partnership with the community, to develop an awareness of local and involvement in
          global issues.
        </li>
        <li>
          As an international school, to build bridges between cultures; and by developing respect,
          understanding and interest in the beliefs and cultures of others, to ensure that our
          pupils are comfortable with a multi-cultural society that embraces and celebrates the
          differences between us.
        </li>
        <li>
          To provide an environment that encourages pupils to become caring, thoughtful and
          responsible citizens.
        </li>
      </ul>
    </div>
  );
};

const TeachingSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">2. Teaching</h2>
      <span className="font-medium">
        To provide high-quality, excellent teaching, all teachers at our schools do the following:
      </span>
      <ul className="ml-4 list-inside list-disc space-y-1">
        <li>
          Encourage the pupils to become independent learners through a variety of teaching
          strategies, including allowing one group to work independently while the others are
          engaged in focus teaching.
        </li>
        <li>Focus teach all ability groups, ensuring equal allocation of time to each group.</li>
        <li>Promote pupil confidence through appropriate recognition of achievement.</li>
        <li>
          Make the most of opportunities for learning which lie outside the planned curriculum but
          which benefit learning, such as visits by authors, actors, and artists, exhibitions, and
          local excursions to places of cultural interest.
        </li>
        <li>
          Ensure that subject knowledge and pedagogic expertise are of a high standard and up to
          date in line with the New Primary Curriculum.
        </li>
        <li>
          While following the National Curriculum, take into account the international nature of our
          students and the context of our school.
        </li>
        <li>
          Provide a broad and balanced curriculum which is develops a love for learning, inspires
          excellence and promotes communication, collaboration, creativity and critical thinking.
        </li>
      </ul>
    </div>
  );
};

const RequestTeachingPage = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-20rem)] flex-col">
      <div className="container mx-auto space-y-6 p-5">
        <div className="mt-16 flex flex-col items-center gap-1">
          <h1 className="text-2xl font-bold uppercase">Teaching and Learning policy</h1>
          <p className="text-muted-foreground">Reviewed on: Nov 2025 Next Review: Nov 2026</p>
        </div>
        <div className="max-h-100 space-y-6 overflow-scroll">
          <IntroductionSection />
          <TeachingSection />
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="terms" />
          <Label htmlFor="terms">
            I have read the policy and agree to become the Byway LMS's instructor.
          </Label>
        </div>
        <Button>
          Send request
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default RequestTeachingPage;
