package ca.polymtl.multisic.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Track.class)
public abstract class Track_ {

	public static volatile SingularAttribute<Track, String> imagesurl;
	public static volatile SingularAttribute<Track, String> previewurl;
	public static volatile SingularAttribute<Track, String> artist;
	public static volatile SingularAttribute<Track, String> album;
	public static volatile SingularAttribute<Track, String> name;
	public static volatile SetAttribute<Track, PlayList> playlists;
	public static volatile SingularAttribute<Track, Long> id;

}

