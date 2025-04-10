import * as motion from 'motion/react-client';
import ButtonMain from './ButtonMain';

export default function CardReview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative h-[20rem] flex flex-col justify-center items-center w-[20rem] overflow-hidden rounded-lg bg-gradient-to-b from-gray-800 to-gray-900"
    >
      {/* Content */}
      <div className="  p-6 text-white">
        <h2 className="mb-3 text-lg leading-tight font-bold">
          WALK WITH US TOWARDS A GREENER PLANET
        </h2>
        <div className="mb-3">
          <span className="text-yellow-400">★★★★</span>
          <span className="text-gray-500">★</span>
        </div>
        <p className="text-xs opacity-90">
          I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click "Edit
          Text" to make it your own.
        </p>
          </div>
          <ButtonMain type="third" onClick={() => {}}>
            Read More   
          </ButtonMain>
    </motion.div>
  );
}
