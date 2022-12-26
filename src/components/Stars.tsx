import { Fade } from "@suid/material";
import { Parallax } from "rallax";
import { Star } from "../ui/Star";
import { randRangeInt, randRange, generateRandomColor } from "../utils";

const leftRange = [-50, 150] as const;
const speedRange = [-0.1, -0.2] as const;

export const Stars = ({ pages }: { pages: number }) => (
  <>
    {[...Array(randRangeInt(30, 100) || 1)].map((_, i) => {
      const width = randRangeInt(10, 40);
      const left = randRangeInt(...leftRange);
      const animationDirection = left < 50 ? "right" : "left";
      const speed = randRange(...speedRange);
      const translateX =
        randRangeInt(1000) * (animationDirection === "left" ? -1 : 1);
      const boxShadow = `0 0 ${(width * 4) / 5}px ${-width / 3}px #ffffff1f`;

      return (
        <Parallax z={-100}>
          <Star
            sx={{
              left: `${left}%`,
              width: `${width}px`,
              backgroundColor: `${generateRandomColor(0.2)}`,
              boxShadow,
              animation: `${animationDirection} ${randRangeInt(
                80,
                120
              )}s ease-in-out infinite alternate`,
              [`@keyframes ${animationDirection}`]: {
                "0%": { opacity: 0, transform: `translateX(0)` },
                "5%": { opacity: 1 },
                "90%": { opacity: 1 },
                "100%": {
                  opacity: 0,
                  transform: `translateX(${translateX}px)`,
                },
              },
            }}
          />
        </Parallax>
      );
    })}
  </>
);
