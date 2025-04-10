import * as motion from 'motion/react-client';
import ButtonMain from './ButtonMain';

// ประกาศข้อความเป็นตัวแปรไว้ด้านบน
const cardContent = {
  title: 'WALK WITH US TOWARDS A GREENER PLANET',
  rating: 4,
  description:
    'I\'m a paragraph. Click here to add your own text and edit me. It\'s easy. Just click "Edit Text" to make it your own.',
  buttonText: 'Read More',
};

export default function CardReview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative flex h-[20rem] w-[20rem] flex-col items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-gray-800 to-gray-900"
    >
      {/* Content */}
      <div className="p-6 text-white">
        <h2 className="mb-3 text-lg leading-tight font-bold">{cardContent.title}</h2>
        <div className="mb-3">
          <span className="text-yellow-400">{'★'.repeat(cardContent.rating)}</span>
          <span className="text-gray-500">{'★'.repeat(5 - cardContent.rating)}</span>
        </div>
        <p className="text-xs opacity-90">{cardContent.description}</p>
      </div>
      <ButtonMain type="third" onClick={() => {}}>
        {cardContent.buttonText}
      </ButtonMain>
    </motion.div>
  );
}
