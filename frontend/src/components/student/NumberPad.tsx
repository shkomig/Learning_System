import { motion } from 'framer-motion';
import { Delete } from 'lucide-react';

interface NumberPadProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  maxDigits?: number;
}

export function NumberPad({ value, onChange, onSubmit, maxDigits = 3 }: NumberPadProps) {
  const handleNumberClick = (num: number) => {
    if (value.length < maxDigits) {
      onChange(value + num.toString());
    }
  };

  const handleDelete = () => {
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    onChange('');
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="max-w-sm mx-auto">
      {/* Display */}
      <div className="mb-6">
        <div className="bg-white border-4 border-primary rounded-2xl p-6 text-center">
          <div className="text-6xl font-bold text-text h-20 flex items-center justify-center">
            {value || '?'}
          </div>
        </div>
      </div>

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {numbers.map((num) => (
          <motion.button
            key={num}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNumberClick(num)}
            className="bg-white hover:bg-primary hover:text-white text-text font-bold text-3xl rounded-2xl h-20 shadow-md transition-colors duration-200"
          >
            {num}
          </motion.button>
        ))}
      </div>

      {/* Bottom Row: 0, Clear, Delete */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClear}
          className="bg-error hover:bg-error/90 text-white font-bold text-xl rounded-2xl h-20 shadow-md transition-colors duration-200"
        >
          C
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNumberClick(0)}
          className="bg-white hover:bg-primary hover:text-white text-text font-bold text-3xl rounded-2xl h-20 shadow-md transition-colors duration-200"
        >
          0
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-2xl h-20 shadow-md transition-colors duration-200 flex items-center justify-center"
        >
          <Delete className="w-8 h-8" />
        </motion.button>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSubmit}
        disabled={!value}
        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-2xl rounded-3xl h-16 shadow-lg transition-all duration-200"
      >
        בדיקה ✓
      </motion.button>
    </div>
  );
}


