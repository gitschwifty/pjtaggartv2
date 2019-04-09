import React from 'react';

interface HeaderProps {
  title: string;
  date?: string;
  category?: string;
  subtitle?: string;
  minititle?: string;
  tags?: string[];
}

class HeaderContainer extends React.Component<HeaderProps> {
  public render() {
    const { title, subtitle, date, category, tags, minititle } = this.props;

    const subtitleHeader = subtitle ? (
      <h2 className='header subtitle'>{subtitle}</h2>
    ) : null;

    const dateHeader = date ? (
      <h3 className='header date_header'>{new Date(date).toUTCString()}</h3>
    ) : null;

    const categoryHeader = category ? (
      <h3 className='header category_header'>
        Posted to {category.charAt(0).toUpperCase() + category.slice(1)}
      </h3>
    ) : null;

    const tagsHeader = tags ? (
      <h4 className='header tags_header'>Tags: {tags.join(', ')}</h4>
    ) : null;

    const miniTitleHeader = minititle ? (
      <h3 className='header category_header'>{minititle}</h3>
    ) : null;

    return (
      <React.Fragment>
        <h1 className='header title'>{title}</h1>
        {subtitleHeader}
        {dateHeader}
        {miniTitleHeader}
        {categoryHeader}
        {tagsHeader}
      </React.Fragment>
    );
  }
}

export default HeaderContainer;
