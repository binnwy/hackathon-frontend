import React, { useState, useRef } from 'react';
import { TrendingUp, Upload, X, FileText, ArrowLeft, Download } from 'lucide-react';

// Feature names for the 14 inputs (matching Flask API)
const FEATURE_NAMES = [
  'koi_score', 'koi_fpflag_nt', 'koi_fpflag_ss', 'koi_fpflag_co', 'koi_fpflag_ec',
  'koi_period', 'koi_duration', 'koi_depth', 'koi_prad', 'koi_impact',
  'koi_steff', 'koi_slogg', 'koi_srad', 'koi_kepmag'
];

// Feature Input Component
const FeatureInput = ({ name, value, onChange, placeholder, onEnter, inputRef }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-white/90 block">
      {name.replace(/_/g, ' ').toUpperCase()}
    </label>
    <input
      ref={inputRef}
      type="number"
      step="any"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onEnter();
        }
      }}
      placeholder={placeholder || `Enter ${name.replace(/_/g, ' ')}`}
      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
    />
  </div>
);

// CSV Uploader Component
const CsvUploader = ({ onFileSelect, selectedFile, onClear }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].name.endsWith('.csv')) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Bulk CSV Upload
        </h3>
        <button
          onClick={onClear}
          aria-label="Clear all inputs"
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      {selectedFile ? (
        <div className="bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-pink-400" />
              <span className="text-white font-medium">{selectedFile.name}</span>
            </div>
            <button
              onClick={onClear}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver 
              ? 'border-pink-400 bg-pink-400/10' 
              : 'border-white/30 hover:border-white/50'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
        >
          <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
          <p className="text-white/70 mb-2">Drag & drop CSV file here</p>
          <p className="text-white/50 text-sm mb-4">or</p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="hidden"
            id="csv-upload"
          />
          <label
            htmlFor="csv-upload"
            className="inline-block px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg cursor-pointer transition-colors"
          >
            Choose File
          </label>
        </div>
      )}
    </div>
  );
};

// Result Modal Component
const ResultModal = ({ predictionResult, onClose, onDownloadCsv, csvFile }) => {
  if (!predictionResult) return null;

  const bgClass =
    predictionResult.status === 'positive'
      ? 'bg-purple-500/20 border-purple-400/50'
      : predictionResult.status === 'negative'
      ? 'bg-red-500/20 border-red-400/50'
      : predictionResult.status === 'error'
      ? 'bg-red-500/20 border-red-400/50'
      : 'bg-pink-500/20 border-pink-400/50';

  const textClass =
    predictionResult.status === 'positive'
      ? 'text-purple-300'
      : predictionResult.status === 'negative'
      ? 'text-red-300'
      : predictionResult.status === 'error'
      ? 'text-red-300'
      : 'text-pink-300';

  const title =
    predictionResult.status === 'positive'
      ? '✓ Exoplanet Detected'
      : predictionResult.status === 'negative'
      ? '✗ No Exoplanet Detected'
      : predictionResult.status === 'error'
      ? '⌀ Error'
      : '📊 Analysis Complete';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className={`max-w-lg w-full p-6 rounded-xl border-2 backdrop-blur-sm ${bgClass} relative slide-in-right`}>
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <div className="space-y-4">
          <h3 className={`text-2xl font-bold ${textClass} text-center`}>{title}</h3>
          <p className="text-white/90 text-lg text-center">{predictionResult.message}</p>
          <p className="text-white/70 text-center">{predictionResult.details}</p>
          {predictionResult.status !== 'error' && (
            <>
              <div className="flex items-center justify-center gap-4">
                <span className="text-white/80 text-center">
                  Processed: <span className="font-bold text-2xl">{predictionResult.processed}</span>
                </span>
                <span className="text-white/80 text-center">
                  Exoplanets Found: <span className="font-bold text-2xl">{predictionResult.exoplanetsFound}</span>
                </span>
              </div>
              {csvFile && (
                <button
                  onClick={onDownloadCsv}
                  className="mt-4 w-full px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Detailed CSV Results
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const API_BASE_URL = 'http://127.0.0.1:5000';

export default function Dashboard() {
  const inputRefs = useRef([]);
  const [manualInputs, setManualInputs] = useState(Array(14).fill(''));
  const [csvFile, setCsvFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (index, value) => {
    const newInputs = [...manualInputs];
    newInputs[index] = value;
    setManualInputs(newInputs);
  };

  const handleCsvFileSelect = (file) => {
    setCsvFile(file);
    setPredictionResult(null);
  };

  const clearAllInputs = () => {
    setManualInputs(Array(14).fill(''));
    setCsvFile(null);
    setPredictionResult(null);
  };

  const canPredict = csvFile || manualInputs.some(input => input.trim() !== '');

  const downloadCsv = async () => {
    if (!predictionResult || !csvFile) return;

    try {
      const formData = new FormData();
      formData.append('file', csvFile);
      
      const response = await fetch(`${API_BASE_URL}/predict_csv`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to download CSV');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'exoplanet_predictions.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download CSV file');
    }
  };

  const runPrediction = async () => {
    setIsLoading(true);
    setPredictionResult(null);

    try {
      let response;
      let result;

      if (csvFile) {
        // CSV Upload - Use predict_csv_stats endpoint
        const formData = new FormData();
        formData.append('file', csvFile);
        response = await fetch(`${API_BASE_URL}/predict_csv_stats`, {
          method: 'POST',
          body: formData
        });
      } else {
        // Manual Input - Create object with feature names as keys
        const featuresObj = {};
        FEATURE_NAMES.forEach((name, index) => {
          featuresObj[name] = parseFloat(manualInputs[index]) || 0;
        });
        
        response = await fetch(`${API_BASE_URL}/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(featuresObj)
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
      }

      result = await response.json();
      
      // Adapt the response format for CSV stats
      if (csvFile && result.status === 'success') {
        setPredictionResult({
          status: 'positive',
          message: result.message,
          details: result.details,
          processed: result.totalProcessed,
          exoplanetsFound: result.candidatesFound
        });
      } else {
        setPredictionResult({
          ...result,
          processed: result.processed || 1,
          exoplanetsFound: result.status === 'positive' ? 1 : 0
        });
      }
    } catch (error) {
      console.error('Prediction error:', error);
      setPredictionResult({
        status: 'error',
        message: 'Prediction failed',
        details: error.message,
        processed: 0,
        exoplanetsFound: 0
      });
    } finally {
      setIsLoading(false);
      setShowModal(true);
    }
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  };

  return (
    <>
      {/* Back Button */}
      <button
        onClick={goBack}
        className="fixed top-4 left-4 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors"
        aria-label="Go back to landing page"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 p-8 space-y-10">
          {/* Manual Input Section */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Manual Data Input</h2>
            <div className="grid grid-cols-1 gap-6 max-h-[400px] overflow-y-auto pr-2 dashboard-scroll">
              {FEATURE_NAMES.map((name, index) => (
                <FeatureInput
                  key={name}
                  name={name}
                  value={manualInputs[index]}
                  onChange={(value) => handleInputChange(index, value)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  onEnter={() => {
                    const nextIndex = index + 1;
                    if (nextIndex < 14) inputRefs.current[nextIndex]?.focus();
                  }}
                />
              ))}
            </div>
          </section>

          {/* CSV Upload Section */}
          <section>
            <CsvUploader
              onFileSelect={handleCsvFileSelect}
              selectedFile={csvFile}
              onClear={clearAllInputs}
            />
          </section>

          {/* Run Analysis Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-pink-400" />
              <h2 className="text-3xl font-bold text-white">Run Analysis</h2>
            </div>

            <button
              onClick={runPrediction}
              disabled={!canPredict || isLoading}
              className={`predict-button w-full px-8 py-4 text-lg font-bold text-white rounded-xl transition-all duration-300 ${
                !canPredict || isLoading
                  ? 'bg-gray-500/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
              }`}
            >
              {isLoading ? 'ANALYZING...' : 'RUN PREDICTION'}
            </button>
          </section>
        </div>

        {/* Result Modal */}
        {showModal && (
          <ResultModal
            predictionResult={predictionResult}
            onClose={() => setShowModal(false)}
            onDownloadCsv={downloadCsv}
            csvFile={csvFile}
          />
        )}

        <style>{`
          .predict-button {
            position: relative;
            transition: all 0.3s ease;
            transform-style: preserve-3d;
          }

          .predict-button:hover:not(:disabled) {
            transform: translateY(-2px) rotateX(5deg);
            box-shadow: 0 20px 40px rgba(255, 107, 107, 0.4);
          }

          .predict-button:active:not(:disabled) {
            transform: translateY(0) rotateX(0deg);
          }

          .dashboard-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .dashboard-scroll::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }

          .dashboard-scroll::-webkit-scrollbar-thumb {
            background: rgba(255, 107, 107, 0.6);
            border-radius: 3px;
          }

          .dashboard-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 107, 107, 0.8);
          }

          @keyframes slideInRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }

          .slide-in-right {
            animation: slideInRight 0.5s ease-out;
          }
        `}</style>
      </div>
    </>
  );
}