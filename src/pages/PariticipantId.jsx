import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { PDFDocument } from "pdf-lib";
import { useLocation } from "react-router-dom";
import IDCard from "./IDCard";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { Skeleton } from "@mui/material";

const ParticipantIDGeneratorSingle = () => {
  const [participant, setParticipant] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef();
  const { userId } = useParams();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const HEADER_KEY = import.meta.env.VITE_CUSTOM_HEADER_KEY;
  const location = useLocation();
  const [count] = useState(location.state?.count || null);
  useEffect(() => {
    if (!userId) {
      setNotFound(true);
      return;
    }

    const fetchParticipant = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${baseURL}/api/registration/get_participant?participant_id=${userId}`,
          {
            headers: { [HEADER_KEY]: API_KEY },
          }
        );
        const data = await res.json();

        if (!res.ok || !data || !data.id) {
          setNotFound(true);
        } else {
          setParticipant(data);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipant();
  }, [userId, baseURL, API_KEY, HEADER_KEY]);

  const saveAsPDF = async () => {
    if (!cardRef.current || !participant) return;

    await document.fonts.ready;

    // Wait for all images to load completely, especially the profile image
    const images = cardRef.current.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete && img.naturalHeight > 0 && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const handleLoad = () => {
            img.removeEventListener("load", handleLoad);
            img.removeEventListener("error", handleError);
            resolve();
          };
          const handleError = () => {
            img.removeEventListener("load", handleLoad);
            img.removeEventListener("error", handleError);
            console.warn(`Image failed to load: ${img.src}`);
            resolve();
          };
          img.addEventListener("load", handleLoad);
          img.addEventListener("error", handleError);
        });
      })
    );

    const CARD_WIDTH_PX = 350;
    const CARD_HEIGHT_PX = 520;

    // Adjust scale for mobile devices to prevent stretching
    const isMobile = window.innerWidth <= 768;
    const devicePixelRatio = window.devicePixelRatio || 1;
    const SCALE = isMobile ? Math.min(2, devicePixelRatio) : 3;

    const canvas = await html2canvas(cardRef.current, {
      width: CARD_WIDTH_PX,
      height: CARD_HEIGHT_PX,
      scale: SCALE,
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      logging: false,
      imageTimeout: 20000,
      // Mobile-specific optimizations
      windowWidth: CARD_WIDTH_PX,
      windowHeight: CARD_HEIGHT_PX,
      scrollX: 0,
      scrollY: 0,
      foreignObjectRendering: false,
    });

    // Create a final canvas with exact dimensions to prevent any stretching
    const finalCanvas = document.createElement("canvas");
    const ctx = finalCanvas.getContext("2d");
    finalCanvas.width = CARD_WIDTH_PX * SCALE;
    finalCanvas.height = CARD_HEIGHT_PX * SCALE;

    // Draw with exact dimensions
    ctx.drawImage(canvas, 0, 0, finalCanvas.width, finalCanvas.height);

    const imgData = finalCanvas.toDataURL("image/png", 1.0);
    const pdf = await PDFDocument.create();
    const CARD_WIDTH_PT = (CARD_WIDTH_PX / 96) * 72;
    const CARD_HEIGHT_PT = (CARD_HEIGHT_PX / 96) * 72;

    const page = pdf.addPage([CARD_WIDTH_PT, CARD_HEIGHT_PT]);
    const pngImage = await pdf.embedPng(imgData);

    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: CARD_WIDTH_PT,
      height: CARD_HEIGHT_PT,
    });

    const pdfBytes = await pdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${participant.name?.trim() || "participant"}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (notFound) return <NotFoundPage />;

  return (
    <div
      className="flex flex-col md:flex-row w-full items-center p-4 md:h-full md:justify-center pt-10 md:pt-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/bg1.jpg')" }}
    >
      <div className="flex flex-col md:flex-row w-full max-w-6xl mt-0 md:mt-3 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-6">
        {/* Illustration */}
        <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center h-[700px] relative">
          <img
            src="/assets/images/id3d.png"
            alt="ID Illustration"
            className="h-full object-contain z-0 "
          />
          <div className="absolute bottom-6 bg-black/50 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 shadow-md text-center z-10">
            <h2 className="text-2xl font-bold text-white tracking-wide drop-shadow">
              Welcome!
            </h2>
            <h4 className="text-base font-bold text-white/80 mt-1 drop-shadow-sm">
              {" "}
              Participant No.{count}
            </h4>
            <p className="text-base text-white/80 mt-1 drop-shadow-sm">
              {" "}
              Please Download your Digital ID
            </p>
          </div>
        </div>

        {/* ID Generator */}
        <div className="w-full md:w-1/2 flex flex-col mt-8 items-center">
          <div className="block md:hidden max-w-5xl mx-auto p-4 text-center text-white">
            <h2 className="text-2xl font-bold text-white tracking-wide drop-shadow">
              Welcome!{" "}
            </h2>
            <h4 className="text-base font-bold text-white/80 mt-1 drop-shadow-sm">
              {" "}
              Participant No.{count}
            </h4>
            <p className="text-base text-white/80 mt-1 drop-shadow-sm">
              {" "}
              Please Download your Digital ID
            </p>
          </div>

          {/* ID Card Preview */}
          <div className="w-full overflow-x-auto flex justify-center mt-4">
            <div ref={cardRef} className="id-card-container">
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  width={350}
                  height={520}
                  animation="wave"
                  sx={{ borderRadius: 4 }}
                />
              ) : participant ? (
                <IDCard participant={participant} />
              ) : null}
            </div>
          </div>

          {/* Download Button */}
          {participant && !loading && (
            <div className="flex justify-center mt-6">
              <button
                onClick={saveAsPDF}
                className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition shadow-md"
              >
                Download Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantIDGeneratorSingle;
