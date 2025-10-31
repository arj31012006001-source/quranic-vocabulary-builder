import React from 'react';

interface HighlightProps {
  text: string;
  keyword: string;
}

const Highlight: React.FC<HighlightProps> = ({ text, keyword }) => {
  if (!keyword || !text) {
    return <>{text}</>;
  }

  // For multi-word meanings like "From, of", we only use the first word for highlighting.
  const primaryKeyword = keyword.split(',')[0].trim();
  if (!primaryKeyword) {
    return <>{text}</>;
  }

  try {
    // 'gi' for global, case-insensitive search
    const regex = new RegExp(`(${primaryKeyword})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === primaryKeyword.toLowerCase() ? (
            <strong key={index} className="font-bold text-red-600 dark:text-red-500">
              {part}
            </strong>
          ) : (
            part
          )
        )}
      </>
    );
  } catch (error) {
    console.error('Error creating regex for highlighting:', error);
    return <>{text}</>;
  }
};

export default Highlight;